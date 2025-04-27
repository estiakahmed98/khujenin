import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-4">
        <ul>
          <li>
            <button
              className={`w-full text-left px-4 py-3 ${
                activeSection === "dashboard"
                  ? "bg-gray-700 border-l-4 border-blue-500"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveSection("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-3 ${
                activeSection === "categories"
                  ? "bg-gray-700 border-l-4 border-blue-500"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveSection("categories")}
            >
              Categories
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-3 ${
                activeSection === "products"
                  ? "bg-gray-700 border-l-4 border-blue-500"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveSection("products")}
            >
              Products
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 