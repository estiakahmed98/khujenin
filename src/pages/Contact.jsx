import React from "react";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-6">Contact Us</h1>

      <p className="text-lg text-gray-700 mb-4">
        Have a question or need support? We're here to help! Reach out to us
        anytime through the channels below.
      </p>

      <div className="space-y-4 text-lg text-gray-800">
        <div>
          <span className="font-semibold text-green-700">WhatsApp:</span>{" "}
          <a
            href="https://wa.me/8801XXXXXXXXX"
            className="underline hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            +8801XXXXXXXXX
          </a>
        </div>

        <div>
          <span className="font-semibold text-green-700">Email:</span>{" "}
          <a
            href="mailto:support@khujenin.com"
            className="underline hover:text-green-600"
          >
            support@khujenin.com
          </a>
        </div>

        <div>
          <span className="font-semibold text-green-700">Facebook:</span>{" "}
          <a
            href="https://facebook.com/khujenin"
            className="underline hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            facebook.com/khujenin
          </a>
        </div>
      </div>
    </div>
  );
}
