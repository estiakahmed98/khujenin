import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

// 👇 You’ll later fetch this from Firebase
const mockProducts = [
  {
    id: "1",
    name: "Pure Honey 500ml",
    price: 450,
    imageUrl: "/images/honey.jpg",
    category: "Honey",
  },
  {
    id: "2",
    name: "Organic Ghee",
    price: 750,
    imageUrl: "/images/ghee.jpg",
    category: "Ghee",
  },
  {
    id: "3",
    name: "Premium Dates",
    price: 300,
    imageUrl: "/images/dates.jpg",
    category: "Dates",
  },
  {
    id: "4",
    name: "Mustard Oil 1L",
    price: 220,
    imageUrl: "/images/mustard.jpg",
    category: "Mustard Oil",
  },
  // 👉 Add more items for other categories as needed
];

export default function Home() {
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    const grouped = {};
    mockProducts.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    setGroupedProducts(grouped);
  }, []);

  return (
    <main>
      <Hero />

      <div className=" container mx-auto px-4 py-8">
        <CategoryList />

        {/* Category-wise Product Sections */}
        {Object.keys(groupedProducts).map((category) => (
          <div key={category} className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-green-700">
                {category}
              </h2>
              <Link
                to={`/category/${encodeURIComponent(category)}`}
                className="text-sm text-green-600 hover:underline"
              >
                Show More
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {groupedProducts[category].slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
