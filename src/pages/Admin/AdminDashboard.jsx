import React, { useState, useEffect } from "react";
import AdminService from "../../firebase/adminService";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const adminService = new AdminService();

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

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Categories Section */}
      <section>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </section>

      {/* Products Section */}
      <section>
        <h2>Products</h2>
        {categories.map((category) => (
          <div key={category.id}>
            <h3>{category.name}</h3>
            <ul>
              {products
                .filter((product) => product.category === category.name)
                .map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard;
