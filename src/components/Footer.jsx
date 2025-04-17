import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section with Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Useful Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Useful Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/about" className="hover:text-green-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:text-green-600">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-green-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-green-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Careers */}
          <div>
            <h3 className="font-medium text-lg mb-4">Careers</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/blog" className="hover:text-green-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="/press" className="hover:text-green-600">
                  Press
                </a>
              </li>
              <li>
                <a href="/partnerships" className="hover:text-green-600">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-green-600">
                  Support
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-green-600">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/events" className="hover:text-green-600">
                  Events
                </a>
              </li>
              <li>
                <a href="/community" className="hover:text-green-600">
                  Community
                </a>
              </li>
              <li>
                <a href="/social" className="hover:text-green-600">
                  Social Media
                </a>
              </li>
              <li>
                <a href="/newsletter" className="hover:text-green-600">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="/subscribe" className="hover:text-green-600">
                  Subscribe
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="font-medium text-lg mb-4">Subscribe</h3>
            <p className="text-gray-600 mb-4">
              Join our community to receive updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-100 p-2 rounded-l flex-1 text-sm"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r text-sm">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              By subscribing, you agree to our Privacy Policy
            </p>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t my-8"></div>

        {/* Bottom Section with Logo and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-green-700">Khuje Nin</h2>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-pink-600">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-red-600">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="/privacy"
              className="text-sm text-gray-600 hover:text-green-600"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-600 hover:text-green-600"
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="text-sm text-gray-600 hover:text-green-600"
            >
              Cookie Policy
            </a>
          </div>
          <div className="text-sm text-gray-600">
            © 2024 Khuje Nin. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
