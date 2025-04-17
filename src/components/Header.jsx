import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const categories = [
  "Honey",
  "Ghee",
  "Dates",
  "Mustard Oil",
  "Molasses",
  "Masala",
  "ভাই ভাই মধু ঘর",
  "Seba Foods",
  "Natural Foods",
  "সিরাজগঞ্জ সরিষা মিল",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Khuje Nin Logo" width={40} height={40} />
          <p className="text-xl font-bold text-green-700">Khuje Nin</p>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className={`hover:text-green-600 ${
              isActive("/") ? "text-green-700 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1 hover:text-green-600 ${
                location.pathname.startsWith("/category")
                  ? "text-green-700 font-semibold"
                  : ""
              }`}
            >
              Category <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 bg-white border mt-2 rounded shadow-md w-48 z-10">
                {categories.map((cat, index) => (
                  <Link
                    key={index}
                    to={`/category/${cat}`}
                    className="block px-4 py-2 hover:bg-green-100 text-sm"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/about"
            className={`hover:text-green-600 ${
              isActive("/about") ? "text-green-700 font-semibold" : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`hover:text-green-600 ${
              isActive("/contact") ? "text-green-700 font-semibold" : ""
            }`}
          >
            Contact
          </Link>
          <a
            href="https://wa.me/+8801616367606?text=Hello%20Khuje%20Nin!%20I%20am%20interested%20in%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-green-700"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <Link
            to="/"
            className={`block py-2 ${
              isActive("/") ? "text-green-700 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <div className="py-2">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`w-full text-left flex items-center justify-between ${
                location.pathname.startsWith("/category")
                  ? "text-green-700 font-semibold"
                  : ""
              }`}
            >
              Category <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div className="pl-4 pt-2">
                {categories.map((cat, index) => (
                  <Link
                    key={index}
                    to={`/category/${cat}`}
                    className="block py-1 text-sm"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/about"
            className={`block py-2 ${
              isActive("/about") ? "text-green-700 font-semibold" : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block py-2 ${
              isActive("/contact") ? "text-green-700 font-semibold" : ""
            }`}
          >
            Contact
          </Link>
          <a
            href="https://wa.me/+8801616367606?text=Hello%20Khuje%20Nin!%20I%20am%20interested%20in%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-white bg-green-600 text-center rounded mt-2"
          >
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
