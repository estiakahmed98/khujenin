import React, { useState, useEffect, useRef } from 'react';
import AdminService from '../../firebase/adminService';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const adminService = new AdminService();

  const handleCreateProduct = async () => {
    try {
      const newProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
      };
      await adminService.createProduct(newProduct);
      resetForm();
      handleGetAllProducts();
      toggleFormModal();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleGetProduct = async (productId) => {
    try {
      const product = await adminService.getProduct(productId);
      setSelectedProduct(product);
      setProductName(product.name);
      setProductDescription(product.description);
      setProductPrice(product.price);
      setProductCategory(product.category);
    } catch (error) {
      console.error('Error get product:', error);
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      const updatedProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
      };
      await adminService.updateProduct(productId, updatedProduct);
      toggleModal();
      resetForm();
      handleGetAllProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await adminService.deleteProduct(productId);
      handleGetAllProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleFormModal = () => {
    setIsFormModalOpen(!isFormModalOpen);
    resetForm();
    setSelectedProduct(null);
  };

  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setProductPrice(0);
    setProductCategory('');
  };

  const handleGetAllProducts = async () => {
    const allProducts = await adminService.getAllProduct();
    setProducts(allProducts);
  };

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={toggleFormModal}
      >
        Create Product
      </button>

      {/* Create Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedProduct ? 'Update Product' : 'Create Product'}
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Product Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Product Category"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={toggleFormModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={
                    selectedProduct === null
                      ? handleCreateProduct
                      : () => handleUpdateProduct(selectedProduct.id)
                  }
                >
                  {selectedProduct === null ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Update Product</h2>
              <button onClick={toggleModal} className="text-gray-600 text-xl">&times;</button>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full border px-3 py-2 rounded" />
              <input type="text" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="w-full border px-3 py-2 rounded" />
              <input type="number" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))} className="w-full border px-3 py-2 rounded" />
              <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className="w-full border px-3 py-2 rounded" />
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => handleUpdateProduct(selectedProduct.id)}
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2 max-w-[80px] truncate">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      handleGetProduct(product.id);
                      toggleModal();
                    }}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
