import { db, storage } from "./config"; // Import Firestore and Firebase Storage
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Firestore collection reference for products
const productsCollection = collection(db, "products");

// Fetch all products from Firestore
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(productsCollection);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Add a new product to Firestore
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(productsCollection, productData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update an existing product in Firestore
export const updateProduct = async (id, updatedData) => {
  try {
    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, updatedData);
    return "Product updated successfully!";
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product from Firestore
export const deleteProduct = async (id) => {
  try {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    return "Product deleted successfully!";
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
