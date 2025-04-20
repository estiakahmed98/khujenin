import { db } from "./config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc, 
  doc
} from "firebase/firestore";

const productsCollection = collection(db, "products");
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

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(productsCollection, productData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

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

export const getProduct = async (productId) => {
  try {
    const productDoc = doc(db, "products", productId);
    const docSnap = await getDoc(productDoc);
    return { ...docSnap.data(), id: docSnap.id };
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};
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
