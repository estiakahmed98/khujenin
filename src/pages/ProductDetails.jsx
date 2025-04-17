import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../firebase/productService"; // Corrected import path
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const products = await getAllProducts();
        const selectedProduct = products.find((prod) => prod.id === id);
        setProduct(selectedProduct);

        const related = products.filter(
          (prod) =>
            prod.categoryId === selectedProduct.categoryId && prod.id !== id
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-1/2 sm:w-1/3 mb-4 sm:mb-0"
        />
        <div className="ml-0 sm:ml-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-2">{product.description}</p>
          <p className="text-xl font-semibold text-green-700 mt-4">
            ${product.price}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {relatedProducts.map((relatedProduct) => (
          <ProductCard key={relatedProduct.id} product={relatedProduct} />
        ))}
      </div>
    </div>
  );
}
