import { db } from "./config";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

class AdminService {
  constructor() {
    
    
    
    this.productCollection = collection(this.db, 'products');
    this.categoryCollection = collection(this.db, 'categories');
    this.availabilityCollection = collection(this.db, 'availability');
  }

  async createProduct(product) {
    try {
        const docRef = await addDoc(this.productCollection, product);
        return { id: docRef.id, ...product };
    } catch (error) {
        console.error("Error creating product: ", error);
        throw error;
    }
  }

  async getAllProduct() {
    try {
        const querySnapshot = await getDocs(this.productCollection);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error getting all products: ", error);
        throw error;
    }
  }

  async getProduct(productId) {
    try {
        const docRef = doc(this.productCollection, productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting product: ", error);
        throw error;
    }
  }

  async updateProduct(productId, product) {
    try {
        const docRef = doc(this.productCollection, productId);
        await updateDoc(docRef, product);
        return { id: productId, ...product };
    } catch (error) {
        console.error("Error updating product: ", error);
        throw error;
    }
  }

  async deleteProduct(productId) {
    try {
        const docRef = doc(this.productCollection, productId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting product: ", error);
        throw error;
    }
  }

  async createCategory(category) {
    try {
        const docRef = await addDoc(this.categoryCollection, category);
        return { id: docRef.id, ...category };
    } catch (error) {
        console.error("Error creating category: ", error);
        throw error;
    }
  }

  async getAllCategory() {
    try {
        const querySnapshot = await getDocs(this.categoryCollection);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error getting all categories: ", error);
        throw error;
    }
  }

  async getCategory(categoryId) {
    try {
        const docRef = doc(this.categoryCollection, categoryId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting category: ", error);
        throw error;
    }
  }

  async updateCategory(categoryId, category) {
    try {
        const docRef = doc(this.categoryCollection, categoryId);
        await updateDoc(docRef, category);
        return { id: categoryId, ...category };
    } catch (error) {
        console.error("Error updating category: ", error);
        throw error;
    }
  }

  async deleteCategory(categoryId) {
    try {
        const docRef = doc(this.categoryCollection, categoryId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting category: ", error);
        throw error;
    }
  }
}

export default AdminService;
