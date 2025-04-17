import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

export default function ProductCard({ product }) {
  const { id, name, price, imageUrl, category } = product;

  const whatsappLink = `https://wa.me/8801XXXXXXXXX?text=Hi! I want to buy ${name} from Khuje Nin.`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <Link to={`/product/${id}`}>
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-green-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">Category: {category}</p>
        <p className="text-md font-bold text-green-700 mb-4">৳ {price}</p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
        >
          <MessageCircle size={16} /> Buy on WhatsApp
        </a>
      </div>
    </div>
  );
}

{
  /* <ProductCard
  product={{
    id: "abc123",
    name: "Natural Honey",
    price: 450,
    imageUrl: "/images/honey.jpg",
    category: "Honey",
  }}
/> */
}
