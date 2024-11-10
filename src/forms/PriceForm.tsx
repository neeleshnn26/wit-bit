
import React, { useState, useEffect, useRef } from 'react';

interface PriceFormProps {
  onFormValidChange: (valid: boolean) => void;
}

const PriceForm: React.FC<PriceFormProps> = ({ onFormValidChange }) => {

  const priceInputRef = useRef<HTMLInputElement>(null);
  const discountInputRef = useRef<HTMLInputElement>(null);

  
  const [price, setPrice] = useState<number | ''>(
    () => Number(localStorage.getItem('price')) || ''
  );
  const [discount, setDiscount] = useState<number | ''>(
    () => Number(localStorage.getItem('discount')) || ''
  );
  const [discountType, setDiscountType] = useState<'%' | '$'>(
    () => (localStorage.getItem('discountType') as '%' | '$') || '%'
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  console.log(isValid);

  useEffect(() => {
    if (price !== '') localStorage.setItem('price', price.toString());
    if (discount !== '') localStorage.setItem('discount', discount.toString());
    localStorage.setItem('discountType', discountType);
  }, [price, discount, discountType]);

  useEffect(() => {
    const valid = price !== '' && price > 0;
    setIsValid(valid);
    onFormValidChange(valid);
  }, [price, onFormValidChange]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 || e.target.value === '') {
      setPrice(e.target.value === '' ? '' : value);
    }
  };

 
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 || e.target.value === '') {
      setDiscount(e.target.value === '' ? '' : value);
    }
  };

  
  const handleDiscountTypeChange = (type: '%' | '$') => {
    setDiscountType(type);
    
    if (discountInputRef.current) {
      discountInputRef.current.focus();
    }
  };

  return (
    <div className="flex sm:items-start sm:justify-center  md:items-start md:justify-start p-4">
  <div className="w-full min-w-[280px] max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-sm">
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-base sm:text-lg font-medium text-gray-900">Price Info</h3>

      <div className="space-y-4">
        {/* Price Field */}
        <div className="w-full">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
            <input
              ref={priceInputRef}
              id="price"
              type="number"
              value={price}
              placeholder="12000"
              min={0}
              onChange={handlePriceChange}
              className="w-full pl-8 pr-4 py-2 text-base sm:text-sm border border-gray-300 rounded-md 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all
                hover:border-gray-400"
            />
          </div>
        </div>

        {/* Discount Field */}
        <div className="w-full">
          <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-700">
            Discount
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              ref={discountInputRef}
              id="discount"
              type="number"
              value={discount}
              placeholder="12"
              onChange={handleDiscountChange}
              className="w-full flex-1 px-4 py-2 text-base sm:text-sm border border-gray-300 rounded-md 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all
                hover:border-gray-400"
            />
            <div className="flex rounded-md border border-gray-200">
              <button
                type="button"
                onClick={() => handleDiscountTypeChange('%')}
                className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-l-md border-r transition-colors 
                ${discountType === '%' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                %
              </button>
              <button
                type="button"
                onClick={() => handleDiscountTypeChange('$')}
                className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-r-md transition-colors 
                ${discountType === '$' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                $
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default PriceForm;