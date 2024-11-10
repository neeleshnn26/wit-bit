
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar, { MobileMenuButton } from '../components/Sidebar';
import ProductNavbar from '../components/ProductNavbar';
import ProductVariantForm from '../forms/ProductVariantForm';

const ProductVariantPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();


  const handleFormValidChange = (valid: boolean) => {
    setIsValid(valid);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <MobileMenuButton 
        isOpen={isSidebarOpen} 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 p-4 md:p-6">
        <ProductNavbar
          title="Add Product"
          currentStep={1}
          onBack={() => navigate("/manage")}
          onNext={() => {
            if (isValid) {
              navigate("/combinations");
            }
          }}
        />
        <ProductVariantForm 
          initialVariants={[{ name: 'Size', values: ['M'] }]}
          onFormValidChange={handleFormValidChange} 
        />
      </div>
    </div>
  );
};

export default ProductVariantPage;
