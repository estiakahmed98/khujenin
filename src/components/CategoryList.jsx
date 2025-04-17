import React from "react";
import { Link } from "react-router-dom";

const categories = [
  "Honey",
  "Ghee",
  "Dates",
  "Mustard Oil",
  "Molasses",
  "Masala",
  "ভাই ভাই মধু ঘর",
  "Seba Foods",
  "Natural Foods",
  "সিরাজগঞ্জ সরিষা মিল",
];

export default function CategoryList() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Browse Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${encodeURIComponent(category)}`}
            className="bg-green-100 hover:bg-green-200 text-center p-4 rounded-lg shadow-sm transition duration-200 text-green-800 font-medium"
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}
