import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminService from "../firebase/adminService";

const adminService = new AdminService();

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await adminService.getAllCategory();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${encodeURIComponent(category.name)}`}
            className="bg-green-100 hover:bg-green-200 text-center p-4 rounded-lg shadow-sm transition duration-200 text-green-800 font-medium"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
