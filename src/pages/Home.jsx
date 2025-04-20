import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import { getAllProducts } from "../firebase/productService";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Hero />

      <div className="container mx-auto px-4 py-8">
        <CategoryList />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
            />
          ))}
          </div>
      </div>
    </main>
  );
};
