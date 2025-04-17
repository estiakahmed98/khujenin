import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CategoryProducts from "./pages/CategoryProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:categoryId" element={<CategoryProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="text-center py-4 mt-10 bg-gray-200">
          <p>&copy; 2025 Khuje Nin. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
