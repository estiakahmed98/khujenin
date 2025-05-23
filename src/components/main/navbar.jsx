import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useRevalidator } from "react-router";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";
import { useLocation } from "react-router";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const revalidator = useRevalidator();
  const path = useLocation().pathname;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [path]);

  // Fetch settings on component mount and when revalidation occurs
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsRef = doc(db, "settings", "global");
        const settingsSnapshot = await getDoc(settingsRef);

        if (settingsSnapshot.exists()) {
          setSettings(settingsSnapshot.data());
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, [revalidator.state]); // Re-fetch when revalidator state changes

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white border-b border-slate-200">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-2 lg:px-8 container"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <span className="sr-only">KhujeNin</span>
            <img
              alt={settings?.logo_img_alt || "Brand logo"}
              src={settings?.logo_img || "/logoall.png"}
              className="h-14 w-auto"
            />
            <p className="text-2xl font-bold text-green-800">KhujeNin</p>
          </Link>
        </div>

        {/* বিজ্ঞাপন দিন button - Always visible on both mobile and desktop */}
        <div className="flex items-center ">
          <a
            href="https://wa.me/8801303284774?text=Hello%21%20I%20want%20to%20Promotion%20my%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-700 text-white py-2 px-4 mr-3 rounded-xl"
          >
            বিজ্ঞাপন দিন
          </a>

          {/* Hamburger menu button - Mobile only */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="font-medium text-gray-900"
            >
              {item.name}
            </NavLink>
          ))}

          {/* Sign In button - Desktop only */}
          <NavLink
            to="/admin"
            className="font-medium bg-green-800 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition-colors duration-200"
          >
            Sign In
          </NavLink>
        </div>
      </nav>

      {/* Mobile menu dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">KhujeNin</span>
              <img
                alt={settings?.logo_img_alt || "Brand logo"}
                src={settings?.logo_img || "/logoall.png"}
                className="h-10 w-auto"
              />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* Mobile navigation items */}
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* Sign In link - Mobile */}
                <NavLink
                  to="/admin"
                  className="-mx-3 block  text-base/7 font-semibold bg-green-800 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition-colors duration-200"
                >
                  Sign In
                </NavLink>

                {/* বিজ্ঞাপন দিন - Mobile (full width) */}
                <div className="mt-4">
                  <a
                    href="https://wa.me/8801303284774?text=Hello%21%20I%20want%20to%20Promotion%20my%20products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full gap-2 rounded-lg bg-white px-4 py-2 text-green-800 text-lg font-semibold hover:text-green-600 border border-green-800 hover:border-green-600 transition-colors duration-200"
                  >
                    বিজ্ঞাপন দিন
                  </a>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
