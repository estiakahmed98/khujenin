import React, { useState, useEffect } from "react";
import AdminService from "../../firebase/adminService";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const adminService = new AdminService();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await adminService.createCategory({ name: categoryName });
      handleGetAllCategory();
      setCategoryName("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleGetCategory = async (categoryId) => {
    try {
      const category = await adminService.getCategory(categoryId);
      toggleModal();
      setSelectedCategory(category);
      setCategoryName(category.name);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await adminService.updateCategory(selectedCategory.id, {
        name: categoryName,
      });
      handleGetAllCategory();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  const handleDeleteCategory = async (categoryId) => {
    try {
      await adminService.deleteCategory(categoryId);
      handleGetAllCategory();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleGetAllCategory = async () => {
    const data = await adminService.getAllCategory();
    setCategories(data);
  };

  useEffect(() => {
    handleGetAllCategory();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      <form
        onSubmit={
          selectedCategory ? handleUpdateCategory : handleCreateCategory
        }
        className="mb-4"
      >
        <label className="block mb-2">
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {selectedCategory ? "Update Category" : "Create Category"}
        </button>
      </form>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="p-2">{category.id}</td>
              <td className="p-2">{category.name}</td>
              <td className="p-2">
                <button
                  onClick={() => {
                    handleGetCategory(category.id);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedCategory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h4 className="text-lg font-medium text-gray-800">
                Update Category
              </h4>
              <form onSubmit={handleUpdateCategory} className="mt-4">
                <div className="mb-4">
                  <label className="block mb-2">
                    Category Name:
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="border p-2 w-full"
                    />
                  </label>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
