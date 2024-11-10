
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar, {  MobileMenuButton } from '../components/Sidebar';
import ProductNavbar from '../components/ProductNavbar';
import PriceForm from '../forms/PriceForm'; 

const ProductPrice: React.FC = () => {
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

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <ProductNavbar
          title="Add Product"
          currentStep={3}
          onBack={() => navigate("/combinations")}
          onNext={() => {
            if (isValid) {
              navigate("/"); 
            }
          }}
          backLabel="Back"
          nextLabel="Confirm"
        />
        
        <PriceForm onFormValidChange={handleFormValidChange} />
      </div>
    </div>
  );
};

export default ProductPrice;
