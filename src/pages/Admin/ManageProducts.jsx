import React, { useState, useEffect, useRef } from 'react';
import AdminService from '../../firebase/adminService';
import Sidebar from '../../components/Admin/Sidebar';
import Header from '../../components/Admin/Header';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [activeSection, setActiveSection] = useState('products');
  const fileInputRef = useRef(null);

  const adminService = new AdminService();

  const handleCreateProduct = async () => {
    // Validate form
    const errors = {};
    if (!productName.trim()) errors.name = 'Product name is required';
    if (!productDescription.trim()) errors.description = 'Description is required';
    if (productPrice <= 0) errors.price = 'Price must be greater than 0';
    if (!productCategory) errors.category = 'Category is required';
    if (!whatsappNumber.trim()) errors.whatsapp = 'WhatsApp number is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Upload images first
      const uploadedImageUrls = [];
      for (const image of productImages) {
        const imageUrl = await adminService.uploadImage(image);
        uploadedImageUrls.push(imageUrl);
      }

      const newProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
        whatsappNumber: whatsappNumber,
        images: uploadedImageUrls,
        createdAt: new Date().toISOString(),
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
      setWhatsappNumber(product.whatsappNumber || '');
      setImageUrls(product.images || []);
    } catch (error) {
      console.error('Error get product:', error);
    }
  };

  const handleUpdateProduct = async (productId) => {
    // Validate form
    const errors = {};
    if (!productName.trim()) errors.name = 'Product name is required';
    if (!productDescription.trim()) errors.description = 'Description is required';
    if (productPrice <= 0) errors.price = 'Price must be greater than 0';
    if (!productCategory) errors.category = 'Category is required';
    if (!whatsappNumber.trim()) errors.whatsapp = 'WhatsApp number is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Upload new images first
      const uploadedImageUrls = [...imageUrls];
      for (const image of productImages) {
        const imageUrl = await adminService.uploadImage(image);
        uploadedImageUrls.push(imageUrl);
      }

      const updatedProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
        whatsappNumber: whatsappNumber,
        images: uploadedImageUrls,
        updatedAt: new Date().toISOString(),
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
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminService.deleteProduct(productId);
        handleGetAllProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormErrors({});
  };

  const toggleFormModal = () => {
    setIsFormModalOpen(!isFormModalOpen);
    resetForm();
    setSelectedProduct(null);
    setFormErrors({});
  };

  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setProductPrice(0);
    setProductCategory('');
    setWhatsappNumber('');
    setProductImages([]);
    setImageUrls([]);
    setFormErrors({});
  };

  const handleGetAllProducts = async () => {
    const allProducts = await adminService.getAllProduct();
    setProducts(allProducts);
  };

  const handleGetAllCategories = async () => {
    const allCategories = await adminService.getAllCategory();
    setCategories(allCategories);
  };

  const openWhatsApp = (number) => {
    const formattedNumber = number.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedNumber}`, '_blank');
  };

  const toggleCategoryExpansion = (categoryName) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Check if adding these files would exceed the 5 image limit
    if (productImages.length + files.length > 5) {
      alert('You can only upload up to 5 images');
      return;
    }
    
    setProductImages([...productImages, ...files]);
  };

  // Remove an image
  const removeImage = (index) => {
    const newImages = [...productImages];
    newImages.splice(index, 1);
    setProductImages(newImages);
  };

  // Remove a URL image
  const removeImageUrl = (index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  // Filter products based on selected category
  const getFilteredProducts = () => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  };

  // Group products by category
  const getProductsByCategory = () => {
    const groupedProducts = {};
    
    categories.forEach(category => {
      groupedProducts[category.name] = products.filter(
        product => product.category === category.name
      );
    });
    
    return groupedProducts;
  };

  useEffect(() => {
    handleGetAllProducts();
    handleGetAllCategories();
  }, []);

  // Render Table View
  const renderTableView = () => {
    const filteredProducts = getFilteredProducts();
    
    return (
      <div className="overflow-x-auto">
        <div className="mb-4 flex items-center">
          <label className="mr-2 font-medium">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <table className="w-full border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Images</th>
              <th className="px-4 py-2">WhatsApp</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2 max-w-[80px] truncate">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2 max-w-[200px] truncate">{product.description}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">
                  {product.images && product.images.length > 0 ? (
                    <div className="flex space-x-1">
                      {product.images.slice(0, 3).map((image, index) => (
                        <img 
                          key={index} 
                          src={image} 
                          alt={`Product ${index + 1}`} 
                          className="w-10 h-10 object-cover rounded"
                        />
                      ))}
                      {product.images.length > 3 && (
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs">
                          +{product.images.length - 3}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">No images</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {product.whatsappNumber && (
                    <button
                      onClick={() => openWhatsApp(product.whatsappNumber)}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Contact
                    </button>
                  )}
                </td>
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
    );
  };

  // Render Card View
  const renderCardView = () => {
    const groupedProducts = getProductsByCategory();
    
    return (
      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setProductCategory(category.name);
                    toggleFormModal();
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Add Product
                </button>
                <button
                  onClick={() => toggleCategoryExpansion(category.name)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                >
                  {expandedCategory === category.name ? 'Show Less' : 'See More'}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {groupedProducts[category.name] && 
                (expandedCategory === category.name 
                  ? groupedProducts[category.name] 
                  : groupedProducts[category.name].slice(0, 4)
                ).map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    {product.images && product.images.length > 0 ? (
                      <div className="mb-3 h-40 overflow-hidden rounded">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="mb-3 h-40 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <h4 className="font-medium text-lg mb-2">{product.name}</h4>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <p className="font-bold text-blue-600 mb-2">${product.price}</p>
                    <div className="flex justify-between items-center">
                      {product.whatsappNumber && (
                        <button
                          onClick={() => openWhatsApp(product.whatsappNumber)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Contact
                        </button>
                      )}
                      <div className="space-x-1">
                        <button
                          onClick={() => {
                            handleGetProduct(product.id);
                            toggleModal();
                          }}
                          className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            {groupedProducts[category.name] && groupedProducts[category.name].length > 4 && expandedCategory !== category.name && (
              <div className="text-center mt-4">
                <button
                  onClick={() => toggleCategoryExpansion(category.name)}
                  className="text-blue-600 hover:underline"
                >
                  See all {groupedProducts[category.name].length} products
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="flex-1 overflow-auto">
        <Header activeSection={activeSection} />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold">Manage Products</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-lg shadow-sm border">
                <button
                  className={`px-4 py-2 rounded-l-lg ${
                    viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setViewMode('table')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  className={`px-4 py-2 rounded-r-lg ${
                    viewMode === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setViewMode('card')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={toggleFormModal}
              >
                Create Product
              </button>
            </div>
          </div>

          {/* View Content */}
          {viewMode === 'table' ? renderTableView() : renderCardView()}

          {/* Create Form Modal */}
          {isFormModalOpen && (
            <div className="fixed inset-0 bg-opacity-90 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {selectedProduct ? 'Update Product' : 'Create Product'}
                  </h2>
                  <button onClick={toggleFormModal} className="text-gray-600 text-xl">&times;</button>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded`}
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      placeholder="Product Description"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className={`w-full border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded`}
                      rows="3"
                    />
                    {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      placeholder="Product Price"
                      value={productPrice}
                      onChange={(e) => setProductPrice(Number(e.target.value))}
                      className={`w-full border ${formErrors.price ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded`}
                    />
                    {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className={`w-full border ${formErrors.category ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      placeholder="WhatsApp Number (with country code)"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className={`w-full border ${formErrors.whatsapp ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded`}
                    />
                    {formErrors.whatsapp && <p className="text-red-500 text-xs mt-1">{formErrors.whatsapp}</p>}
                    <p className="text-xs text-gray-500 mt-1">Format: +1234567890</p>
                  </div>
                  
                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Images (Max 5)</label>
                    
                    {/* Existing Images (for update) */}
                    {imageUrls.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">Existing Images:</p>
                        <div className="flex flex-wrap gap-2">
                          {imageUrls.map((url, index) => (
                            <div key={index} className="relative">
                              <img 
                                src={url} 
                                alt={`Product ${index + 1}`} 
                                className="w-20 h-20 object-cover rounded border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImageUrl(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* New Images */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-2">New Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {productImages.map((file, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`Upload ${index + 1}`} 
                              className="w-20 h-20 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Upload Button */}
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        disabled={productImages.length + imageUrls.length >= 5}
                        className={`px-3 py-1 rounded ${
                          productImages.length + imageUrls.length >= 5
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        Add Images ({productImages.length + imageUrls.length}/5)
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
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
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Update Product</h2>
                  <button onClick={toggleModal} className="text-gray-600 text-xl">&times;</button>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input 
                      type="text" 
                      value={productName} 
                      onChange={(e) => setProductName(e.target.value)} 
                      className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded`} 
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      value={productDescription} 
                      onChange={(e) => setProductDescription(e.target.value)} 
                      className={`w-full border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded`}
                      rows="3"
                    />
                    {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input 
                      type="number" 
                      value={productPrice} 
                      onChange={(e) => setProductPrice(Number(e.target.value))} 
                      className={`w-full border ${formErrors.price ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded`} 
                    />
                    {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className={`w-full border ${formErrors.category ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      placeholder="WhatsApp Number (with country code)"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className={`w-full border ${formErrors.whatsapp ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded`}
                    />
                    {formErrors.whatsapp && <p className="text-red-500 text-xs mt-1">{formErrors.whatsapp}</p>}
                    <p className="text-xs text-gray-500 mt-1">Format: +1234567890</p>
                  </div>
                  
                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Images (Max 5)</label>
                    
                    {/* Existing Images */}
                    {imageUrls.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">Existing Images:</p>
                        <div className="flex flex-wrap gap-2">
                          {imageUrls.map((url, index) => (
                            <div key={index} className="relative">
                              <img 
                                src={url} 
                                alt={`Product ${index + 1}`} 
                                className="w-20 h-20 object-cover rounded border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImageUrl(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* New Images */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-2">New Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {productImages.map((file, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`Upload ${index + 1}`} 
                              className="w-20 h-20 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Upload Button */}
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        disabled={productImages.length + imageUrls.length >= 5}
                        className={`px-3 py-1 rounded ${
                          productImages.length + imageUrls.length >= 5
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        Add Images ({productImages.length + imageUrls.length}/5)
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
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
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
