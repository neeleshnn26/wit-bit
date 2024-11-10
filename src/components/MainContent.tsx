

import React from 'react';
import { Product, Category } from '../types';

interface MainContentProps {
  onAddCategory: () => void;
  onAddProduct?: () => void;
  categories: Category[];
  products: Product[];
}

const MainContent: React.FC<MainContentProps> = ({
  onAddCategory,
  onAddProduct,
  categories,
  products
}) => {
  return (
    <div className="flex-1 overflow-auto lg:ml-16">
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
          <h1 className="text-xl flex justify-center items-center sm:ml-8 lg:ml-0 sm:text-2xl lg:text-3xl font-semibold text-gray-900">
            Products
          </h1>
          
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onAddCategory}
              className="flex-1 sm:flex-none px-3 py-2 md:px-4 md:py-2 border border-gray-300 
              rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-colors duration-200"
            >
              Add Category
            </button>
            {onAddProduct && (
              <button
                onClick={onAddProduct}
                className="flex-1 sm:flex-none px-3 py-2 md:px-4 md:py-2 bg-blue-600 
                text-white rounded-lg text-sm font-medium hover:bg-blue-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-colors duration-200"
              >
                Add Product
              </button>
            )}
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow 
              duration-200 p-4 md:p-6"
            >
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                {category.name}
              </h2>
              
              <div className="space-y-4">
                {products.filter(product => product.category === category.name).length > 0 ? (
                  products
                    .filter(product => product.category === category.name)
                    .map((product) => (
                      <div
                        key={product.name}
                        className="group bg-white rounded-lg border border-gray-200 
                        hover:shadow-lg transition-all duration-200 hover:border-blue-200 
                        overflow-hidden"
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                         
                          <div className="w-full sm:w-32 relative">
                            <div className="pt-[100%] sm:pt-0 sm:h-32 relative">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover 
                                group-hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                          </div>
                          
                          
                          <div className="flex-1 min-w-0 p-4 sm:py-3 sm:pr-4 sm:pl-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                              ₹{product.price.toLocaleString()}
                            </p>
                            <p className="mt-1 text-sm text-blue-600 font-medium">
                              {product.brand}
                            </p>
                           
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="rounded-lg p-6 bg-gray-50 text-center">
                    <p className="text-sm text-gray-500">
                      
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;