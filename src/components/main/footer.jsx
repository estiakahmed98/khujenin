import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";
import { useRevalidator } from "react-router";

const Footer = () => {
  const [settings, setSettings] = useState(null);
  const revalidator = useRevalidator();

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
    <footer className="bg-white flex flex-col border-t border-green-600">
      <div className="flex flex-col md:flex-row items-center md:w-full md:grow md:justify-between p-4 md:p-6 gap-6">
        {/* Logo & Title */}
        <div className="flex flex-col items-center text-center">
          <img
            src={settings?.logo_img || "/companylogo.png"}
            alt={settings?.logo_img_alt || "Company Logo"}
            className="h-36 md:h-52 rounded-full object-contain"
          />
          <p className="text-green-800 font-extrabold text-2xl md:text-4xl pt-4">
            KhujeNin.xyz
          </p>
        </div>

        {/* Contact Info & Buttons */}
        <div className=" px-4 sm:px-6 lg:px-8">
          {/* Phone */}
          <p>
            <span className="text-xs tracking-wide text-gray-500 uppercase">
              Call us
            </span>
            <a
              href="tel:+8801303284774"
              className="block text-2xl font-medium text-gray-900 hover:opacity-75 sm:text-3xl"
            >
              +8801303284774
            </a>
          </p>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/8801303284774"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-green-600 text-base font-semibold hover:text-green-400 border border-green-600 hover:border-green-400 transition-colors duration-200"
          >
            <img src="/whatsapp.png" alt="whatsapp" className="h-6 w-6" />
            বিজ্ঞাপন দিন
          </a>

          {/* Hours */}
          <ul className="mt-6 space-y-1 text-sm text-gray-700">
            <li>Saturday to Friday: 8am - 10pm</li>
          </ul>

          {/* Social Links */}
          <ul className="mt-6 flex gap-6">
            {/* Facebook */}
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            {/* Instagram */}
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06..."
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-10 flex items-center justify-center border-t border-gray-100 pt-12">
        <div className="sm:flex sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-4 text-xs">
            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                Terms & Conditions
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                Cookies
              </a>
            </li>
          </ul>

          <p className="mt-8 text-xs text-gray-500 sm:mt-0">
            &copy; 2025. KhujeNin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
