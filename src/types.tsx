
export interface Product {
    name: string;
    category: string; // Add category property
    brand: string;
    image: string;
    variants: Variant[]; // Assuming this is defined elsewhere
    combinations: Combination[]; // Assuming this is defined elsewhere
    price: number;
    discount?: {
      method: string;
      value: number;
    };
  }
  
  export interface Variant {
    name: string;
    values: string[];
  }
  
  export interface Combination {
    name: string;
    sku: string;
    quantity: number | null;
    inStock: boolean;
  }
  
  export interface Category {
    id: string;
    name: string;
    products: Product[]; // Assuming this is to hold products under this category
  }
  