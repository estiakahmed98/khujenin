import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import defaultImage from "../assets/logo.png";
import { getProduct } from "../firebase/productService";

export default function ProductCard({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productData = await getProduct(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading || !product) {
    return <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">Loading...</div>;
  }

  const whatsappLink = `https://wa.me/+8801616367606?text=Hi! I want to buy ${product.name} from Khuje Nin.`;
  const productImageUrl = product.imageUrl
  ? product.imageUrl
  : defaultImage;
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <Link to={`/product/${productId}`}>
        <img
          src={productImageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-green-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
        <p className="text-md font-bold text-green-700 mb-4">৳ {product.price}</p>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
          <MessageCircle size={16} /> Buy on WhatsApp
        </a>
      </div>
    </div>
  );
}
