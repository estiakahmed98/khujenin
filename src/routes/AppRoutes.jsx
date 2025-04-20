import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import CategoryProducts from "../pages/CategoryProducts";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageProducts from "../pages/Admin/ManageProducts";
import ManageCategories from "../pages/Admin/ManageCategories";
import ManageAvailability from "../pages/Admin/ManageAvailability";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/manage-products" element={<ManageProducts />} />
      <Route path="/admin/manage-categories" element={<ManageCategories />} />
      <Route
        path="/admin/manage-availability"
        element={<ManageAvailability />}
      />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/category/:category" element={<CategoryProducts />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
