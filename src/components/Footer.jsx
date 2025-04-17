export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold mb-2">Khuje Nin</h2>
          <p className="text-sm text-gray-200">
            We promote and promote your products. Bringing natural, authentic,
            and quality goods right to your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Top Categories</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/category/Honey" className="hover:underline">
                Honey
              </a>
            </li>
            <li>
              <a href="/category/Ghee" className="hover:underline">
                Ghee
              </a>
            </li>
            <li>
              <a href="/category/Dates" className="hover:underline">
                Dates
              </a>
            </li>
            <li>
              <a href="/category/Mustard Oil" className="hover:underline">
                Mustard Oil
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-900 text-center py-3 text-sm text-gray-300">
        © {new Date().getFullYear()} Khuje Nin. All rights reserved.
      </div>
    </footer>
  );
}
