import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDashboard from './pages/ProductDashboard';
import ProductManagement from './pages/ProductManagement';
import ProductVariantPage from './pages/ProductVariantPage';
import ProductCombinations from './pages/ProductCombinations';
import ProductPrice from './pages/ProductPrice';

const App: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<ProductDashboard/>}/>
      <Route path='/manage' element={<ProductManagement/>}/>
      <Route path='/variant' element={<ProductVariantPage/>}/>
      <Route path='/combinations' element={<ProductCombinations/>}/>
      <Route path='/price' element={<ProductPrice/>}/>
    </Routes>
    </>
  );
};

export default App;
