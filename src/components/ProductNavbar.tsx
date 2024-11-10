
import React from 'react';

interface ProductNavbarProps {
  title: string;
  currentStep: number;
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  isNextDisabled?: boolean; 
}

const ProductNavbar: React.FC<ProductNavbarProps> = ({
  title,
  currentStep,
  onBack,
  onNext,
  backLabel = 'Back',
  nextLabel = 'Next',
  isNextDisabled = false 
}) => {
  
  const steps = ['Description', 'Variants', 'Combinations', 'Price Info'];

  const renderStepForLargeScreens = (step: string, index: number) => (
    <React.Fragment key={step}>
      <div className="flex items-center ">
        <span
          className={`text-sm font-medium ${
            index <= currentStep
              ? 'text-blue-600 bg-blue-100 px-2 py-1 rounded'
              : 'text-gray-400'
          }`}
        >
          {step}
        </span>
        {index < steps.length - 1 && (
          <span className="mx-2 text-gray-300">{'>'}</span>
        )}
      </div>
    </React.Fragment>
  );

  const renderStepForSmallScreens = (step: string, index: number) => {
    const isActive = index === currentStep;
    const isPast = index < currentStep;

    return (
      <div key={step} className="flex items-center group  relative">
       
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center
            ${isActive ? 'bg-blue-600 text-white' : 
              isPast ? 'bg-green-500 text-white' : 
              'bg-gray-200 text-gray-600'
            }`}
        >
          {isPast ? '✓' : index + 1}
        </div>

        
        <div className="absolute top-10 left-1/2 -translate-x-1/2 transform 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out
          bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
          {step}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 transform 
            border-4 border-transparent border-b-gray-800"></div>
        </div>

       
        {index < steps.length - 1 && (
          <div className="w-8 h-px bg-gray-300 mx-2"></div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <div className="space-x-2">
          {onBack && (
            <button
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={onBack}
            >
              {backLabel}
            </button>
          )}
          {onNext && (
            <button
              className={`px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 ${
                isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={onNext}
              disabled={isNextDisabled} // Disable Next button if form is invalid
            >
              {nextLabel}
            </button>
          )}
        </div>
      </div>

      {/* Progress Steps for Large Screens */}
      <div className="hidden md:flex items-center justify-start w-full  ">
        {steps.map((step, index) => renderStepForLargeScreens(step, index))}
       </div>

      {/* Progress Steps for Small Screens */}
      <div className="flex md:hidden items-center  justify-center relative ">
        {steps.map((step, index) => renderStepForSmallScreens(step, index))}
      </div>
    </div>
  );
};

export default ProductNavbar;
