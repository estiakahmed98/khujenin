import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminService from "../../firebase/adminService";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");
  const adminService = new AdminService();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await adminService.getAllProduct();
        const categoriesData = await adminService.getAllCategory();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Count products by category
  const getProductCountByCategory = (categoryName) => {
    return products.filter((product) => product.category === categoryName).length;
  };

  // Render Dashboard Section
  const renderDashboard = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <Link 
            to="/admin/manage-products" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            See All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Categories</h3>
            <p className="text-3xl font-bold text-green-600">{categories.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
            <button 
              onClick={() => navigate("/admin/manage-products")}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Products by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="border p-4 rounded-lg">
                <h4 className="font-medium">{category.name}</h4>
                <p className="text-lg font-bold text-blue-600">
                  {getProductCountByCategory(category.name)} products
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render Categories Section
  const renderCategories = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link 
            to="/admin/manage-categories" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Category
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-lg mb-4">
                {getProductCountByCategory(category.name)} products
              </p>
              <Link 
                to={`/admin/manage-categories?category=${category.id}`}
                className="text-blue-600 hover:underline"
              >
                Manage Products
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Products Section
  const renderProducts = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Products</h2>
          <Link 
            to="/admin/manage-products" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Product
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
              <div className="space-y-2">
                {products
                  .filter((product) => product.category === category.name)
                  .slice(0, 3)
                  .map((product) => (
                    <div key={product.id} className="border-b pb-2">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  ))}
                {getProductCountByCategory(category.name) > 3 && (
                  <Link 
                    to={`/admin/manage-products?category=${category.name}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View all {getProductCountByCategory(category.name)} products
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Header activeSection={activeSection} />
        
        {/* Content */}
        <main>
          {activeSection === "dashboard" && renderDashboard()}
          {activeSection === "categories" && renderCategories()}
          {activeSection === "products" && renderProducts()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
