import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../firebase/productService";

export default function RelatedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-green-800 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{products.map((product) => <ProductCard key={product.id} id={product.id} />)}</div>
    </section>
  );
}
