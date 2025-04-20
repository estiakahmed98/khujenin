import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../firebase/productService";
import ProductCard from "../components/ProductCard";
import RelatedProducts from "../components/RelatedProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
        setLoading(true)
      try {
        const productData = await getProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center">
        <img
          src={product.imageUrl ? product.imageUrl : "/logo.png"}
          alt={product.name}
          className="w-1/2 sm:w-1/3 mb-4 sm:mb-0"
        />
        <div className="ml-0 sm:ml-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-2">{product.description}</p>
          <p className="text-xl font-semibold text-green-700 mt-4">
            {product.price}
          </p>
        </div>
      </div>
      <div className="mt-8"><RelatedProducts/>      
      </div>
    </div>
  )};
