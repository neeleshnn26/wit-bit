
import { useEffect, useState, useRef } from 'react';

interface Combination {
  id: string;
  variant: string;
  sku: string;
  inStock: boolean;
  quantity: string;
  error?: string;
}

interface ProductCombinationsFormProps {
  onFormValidChange: (isValid: boolean) => void;
}

const ProductCombinationsForm: React.FC<ProductCombinationsFormProps> = ({ onFormValidChange }) => {
  // Helper function to generate combinations
  const generateCombinations = (arrays: string[][]) => {
    return arrays.reduce((acc, curr) => {
      if (acc.length === 0) return curr.map(item => [item]);
      const newCombos: string[][] = [];
      acc.forEach(combo => {
        curr.forEach(item => {
          newCombos.push([...combo, item]);
        });
      });
      return newCombos;
    }, [] as string[][]);
  };

  const getInitialCombinations = () => {
    // First check for existing combinations
    const savedCombinations = localStorage.getItem('productCombinations');
    if (savedCombinations) {
      return JSON.parse(savedCombinations);
    }

    // If no combinations exist, generate from variants
    const savedVariants = localStorage.getItem('productVariants');
    if (savedVariants) {
      const variants = JSON.parse(savedVariants);
      const variantArrays = variants
        .filter((v: { name: any; values: string | any[]; }) => v.name && v.values.length > 0)
        .map((v: any[]) => v.values);

      if (variantArrays.length > 0) {
        const combos = generateCombinations(variantArrays);
        return combos.map((combo, index) => ({
          id: String(Date.now() + index),
          variant: combo.join('/'),
          sku: '',
          inStock: false,
          quantity: ''
        }));
      }
    }

    return [{ id: '1', variant: '', sku: '', inStock: false, quantity: '' }];
  };

  const [combinations, setCombinations] = useState<Combination[]>(getInitialCombinations());
  const [hasErrors, setHasErrors] = useState<boolean>(true);
  console.log(hasErrors);
  const skuInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const quantityInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const variantInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const handleVariantsChange = () => {
      const savedVariants = localStorage.getItem('productVariants');
      if (savedVariants) {
        const variants = JSON.parse(savedVariants);
        const variantArrays = variants
          .filter((v: { name: any; values: string | any[]; }) => v.name && v.values.length > 0)
          .map((v: any[]) => v.values);

        if (variantArrays.length > 0) {
          const combos = generateCombinations(variantArrays);
          
          const newCombinations = combos.map(combo => {
            const variantString = combo.join('/');
            const existing = combinations.find(c => c.variant === variantString);
            
            if (existing) {
              return existing;
            }

            return {
              id: String(Date.now() + Math.random()),
              variant: variantString,
              sku: '',
              inStock: false,
              quantity: ''
            };
          });

          setCombinations(newCombinations);
        }
      }
    };

    handleVariantsChange();

    window.addEventListener('storage', handleVariantsChange);
    return () => window.removeEventListener('storage', handleVariantsChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('productCombinations', JSON.stringify(combinations));
  }, [combinations]);

  useEffect(() => {
    skuInputRefs.current = skuInputRefs.current.slice(0, combinations.length);
    quantityInputRefs.current = quantityInputRefs.current.slice(0, combinations.length);
    variantInputRefs.current = variantInputRefs.current.slice(0, combinations.length);
  }, [combinations.length]);

  const validateForm = () => {
    const skuCounts = new Map<string, number>();
    const updatedCombinations = combinations.map(combo => {
      if (combo.sku.trim()) {
        skuCounts.set(combo.sku, (skuCounts.get(combo.sku) || 0) + 1);
      }
      return combo;
    });

    const hasAnyErrors = updatedCombinations.some(combo => {
      const isDuplicate = skuCounts.get(combo.sku) && skuCounts.get(combo.sku)! > 1;
      const isEmpty = combo.sku.trim() === '' || combo.variant.trim() === '';
      return isEmpty || isDuplicate;
    });

    setHasErrors(hasAnyErrors);
    onFormValidChange(!hasAnyErrors);
  };

  const handleSkuChange = (id: string, value: string) => {
    setCombinations(prev => {
      const newCombinations = prev.map(combo => ({
        ...combo,
        error: undefined
      }));

      const updatedCombinations = newCombinations.map(combo => {
        if (combo.id === id) {
          const isDuplicate = newCombinations.some(c => c.id !== id && c.sku === value);
          const isEmpty = value.trim() === '';
          return {
            ...combo,
            sku: value,
            error: isEmpty ? 'SKU is required' : isDuplicate ? 'Duplicate SKU' : undefined
          };
        }
        return combo;
      });

      return updatedCombinations;
    });
  };

  const handleToggleChange = (id: string) => {
    setCombinations(prev =>
      prev.map(combo => {
        if (combo.id === id) {
          const newCombo = { ...combo, inStock: !combo.inStock };
          if (newCombo.inStock) {
            setTimeout(() => {
              const index = combinations.findIndex(c => c.id === id);
              quantityInputRefs.current[index]?.focus();
            }, 0);
          }
          return newCombo;
        }
        return combo;
      })
    );
  };

  const handleQuantityChange = (id: string, value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      setCombinations(prev =>
        prev.map(combo =>
          combo.id === id ? { ...combo, quantity: value } : combo
        )
      );
    }
  };

  useEffect(() => {
    validateForm();
  }, [combinations]);

  return (
    <div className="bg-white rounded-lg shadow-md p-1 md:p-4 w-full lg:w-1/2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Combinations</h2>
      </div>
      
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[300px]">
          <thead>
            <tr className="text-left">
              <th className="pb-2 text-sm font-medium">
                Variant <span className="text-red-500">*</span>
              </th>
              <th className="pb-2 text-sm font-medium">
                SKU <span className="text-red-500">*</span>
              </th>
              <th className="pb-2 text-sm font-medium text-center">In stock</th>
              <th className="pb-2 text-sm font-medium">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {combinations.map((combo, index) => (
              <tr key={combo.id}>
                <td className="py-2 pr-2">
                  <input
                    type="text"
                    value={combo.variant}
                    readOnly
                    className="border rounded p-2 w-full text-sm bg-gray-50"
                    ref={el => variantInputRefs.current[index] = el}
                  />
                </td>
                <td className="py-2 pr-2">
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={combo.sku}
                      onChange={(e) => handleSkuChange(combo.id, e.target.value)}
                      className={`border rounded p-2 w-full text-sm ${combo.error ? 'border-red-500' : ''}`}
                      placeholder="Enter SKU"
                      ref={el => skuInputRefs.current[index] = el}
                    />
                    {combo.error && (
                      <div className="text-xs text-red-500">{combo.error}</div>
                    )}
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleToggleChange(combo.id)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${combo.inStock ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${combo.inStock ? 'translate-x-6' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </td>
                <td className="py-2 pr-2">
                  <input
                    type="text"
                    value={combo.quantity}
                    onChange={(e) => handleQuantityChange(combo.id, e.target.value)}
                    placeholder="0"
                    className="border rounded p-2 w-full text-sm"
                    disabled={!combo.inStock}
                    ref={el => quantityInputRefs.current[index] = el}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCombinationsForm;