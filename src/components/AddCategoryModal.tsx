
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryName: string) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    onSave(categoryName); 
    setCategoryName('');
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Add Category
        </h2>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="categoryName" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Name *
            </label>
            <input
              id="categoryName"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="T-shirt"
              required
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
