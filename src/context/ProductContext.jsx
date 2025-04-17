import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

// Create the context
const ProductContext = createContext();

// Create the provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on load
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for easy access
export const useProducts = () => useContext(ProductContext);
