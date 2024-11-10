
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar, { MobileMenuButton } from '../components/Sidebar';
import ProductNavbar from '../components/ProductNavbar';
import ProductForm from '../forms/ProductForm';
import { Category } from '../types'; 

const ProductManagement: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  console.log(setCurrentStep);
  const [categories, setCategories] = useState<Category[]>([]); 

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        
        const storedCategories: Category[] = JSON.parse(localStorage.getItem('categories') || '[]');

       
        const response = await fetch('/products.json'); 
        if (!response.ok) {
          throw new Error('Failed to fetch categories from products.json');
        }
        const data = await response.json();

        
        const jsonCategories: Category[] = data.categories.map((category: { id: string, name: string }) => ({
          id: category.id, 
          name: category.name,
          products: [],
        }));

        
        const allCategories = [...new Map([...jsonCategories, ...storedCategories].map(item => [item.id, item])).values()]; 


        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleNext = () => {
    if (formValid) {
      navigate('/variant');
    }
  };

  const handleFormValidChange = (isValid: boolean) => {
    setFormValid(isValid);
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

      <div className="flex-1 py-4 md:p-6">
        <ProductNavbar
          title="Add Product"
          currentStep={currentStep}
          onBack={() => {navigate("/") 
            localStorage.removeItem('productFormData');
            localStorage.removeItem('price');
            localStorage.removeItem('discount');
            localStorage.removeItem('productFormImagePreview');
            localStorage.removeItem('productVariants');
            localStorage.removeItem('productCombinations');
          }
          }
          onNext={handleNext}
          backLabel="Cancel"
          isNextDisabled={!formValid}
        />

        <ProductForm 
          onFormValidChange={handleFormValidChange} 
          categories={categories}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
