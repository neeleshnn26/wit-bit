

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, X, Plus } from 'lucide-react';

// Types
interface Variant {
  name: string;
  values: string[];
}

interface ProductVariantFormProps {
  initialVariants: Variant[];
  onFormValidChange: (valid: boolean) => void;
}

export const ProductVariantForm: React.FC<ProductVariantFormProps> = ({
  initialVariants = [{ name: '', values: [] }]
}) => {
  const getInitialVariants = () => {
    const savedVariants = localStorage.getItem('productVariants');
    return savedVariants ? JSON.parse(savedVariants) : initialVariants;
  };

  const [variants, setVariants] = useState<Variant[]>(getInitialVariants());
  const [currentInput, setCurrentInput] = useState('');
  const [activeInput, setActiveInput] = useState<number | null>(null);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const valueInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    localStorage.setItem('productVariants', JSON.stringify(variants));
  }, [variants]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, variants.length);
    valueInputRefs.current = valueInputRefs.current.slice(0, variants.length);
  }, [variants.length]);

  const handleDeleteVariant = (indexToDelete: number): void => {
    if (variants.length > 1) {
      setVariants(prevVariants => prevVariants.filter((_, index) => index !== indexToDelete));
    }
  };

  const handleAddOption = (): void => {
    setVariants(prev => {
      const newVariants = [...prev, { name: '', values: [] }];
      setTimeout(() => {
        const lastIndex = newVariants.length - 1;
        inputRefs.current[lastIndex]?.focus();
      }, 0);
      return newVariants;
    });
  };

  const handleNameChange = (index: number, value: string): void => {
    setVariants(prevVariants => prevVariants.map((variant, i) =>
      i === index ? { ...variant, name: value } : variant
    ));
  };

  const handleKeyDown = (variantIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && currentInput.trim()) {
      e.preventDefault();
      const newValue = currentInput.trim().toUpperCase();
      
      setVariants(prevVariants => prevVariants.map((variant, i) => {
        if (i === variantIndex && !variant.values.includes(newValue)) {
          return {
            ...variant,
            values: [...variant.values, newValue]
          };
        }
        return variant;
      }));
      
      setCurrentInput('');
    }
  };

  const handleRemoveValue = (variantIndex: number, valueToRemove: string) => {
    setVariants(prevVariants => prevVariants.map((variant, i) => {
      if (i === variantIndex) {
        return {
          ...variant,
          values: variant.values.filter(value => value !== valueToRemove)
        };
      }
      return variant;
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full lg:w-1/2">
      <div className="space-y-6">
        <h2 className="text-lg font-medium">Variants</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr,1fr,auto] gap-2 sm:gap-4 mb-2">
            <div className="font-medium text-sm sm:text-base">
              Option <span className="text-red-500">*</span>
            </div>
            <div className="font-medium text-sm sm:text-base">
              Values <span className="text-red-500">*</span>
            </div>
            <div className="w-8 sm:w-10" />
          </div>

          {variants.map((variant, variantIndex) => (
            <div key={variantIndex} className="grid grid-cols-[1fr,1fr,auto] gap-2 sm:gap-4 items-start">
              <input
                type="text"
                value={variant.name}
                onChange={(e) => handleNameChange(variantIndex, e.target.value)}
                placeholder="Option name"
                className="border rounded p-2 w-full text-sm sm:text-base"
                ref={el => inputRefs.current[variantIndex] = el}
              />
              
              <div 
                className={`border rounded relative ${activeInput === variantIndex ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => {
                  setActiveInput(variantIndex);
                  valueInputRefs.current[variantIndex]?.focus();
                }}
              >
                <div className="p-2 min-h-[40px] flex flex-wrap gap-1 items-center">
                  {variant.values.map((value, valueIndex) => (
                    <span
                      key={valueIndex}
                      className="inline-flex items-center bg-gray-100 rounded px-1.5 py-0.5 text-sm"
                    >
                      {value}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveValue(variantIndex, value);
                        }}
                        className="ml-1 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="outline-none border-none bg-transparent flex-1 min-w-[60px] text-sm sm:text-base"
                    value={activeInput === variantIndex ? currentInput : ''}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(variantIndex, e)}
                    placeholder={variant.values.length ? '' : 'Type and press Enter'}
                    onFocus={() => setActiveInput(variantIndex)}
                    onBlur={() => setActiveInput(null)}
                    ref={el => valueInputRefs.current[variantIndex] = el}
                  />
                </div>
              </div>

              <button
                onClick={() => handleDeleteVariant(variantIndex)}
                disabled={variants.length === 1}
                className={`p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50
                  ${variants.length === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          ))}

          <button
            onClick={handleAddOption}
            className="text-blue-500 hover:text-blue-600 mt-4 flex items-center gap-1 text-sm sm:text-base"
          >
            <Plus size={16} /> Add Option
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductVariantForm;