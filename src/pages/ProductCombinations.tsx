
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar, {MobileMenuButton } from '../components/Sidebar';
import ProductNavbar from '../components/ProductNavbar';
import ProductCombinationsForm from '../forms/ProductCombinationsForm';

const ProductCombination: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false); 


  const handleNext = () => {
    if (formValid) {
      navigate('/price'); 
    }
  };

  const handleFormValidChange = (isValid: boolean) => {
    setFormValid(isValid); 
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <MobileMenuButton 
        isOpen={isSidebarOpen} 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <ProductNavbar
          title="Add Product"
          currentStep={2}
          onBack={() => navigate("/variant")} 
          onNext={handleNext}
          backLabel="Back"
          isNextDisabled={!formValid}
        />
        
        <ProductCombinationsForm onFormValidChange={handleFormValidChange} />
        
      </div>
    </div>
  );
};

export default ProductCombination;
