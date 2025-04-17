import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-6">
        About Khuje Nin
      </h1>
      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        Welcome to <strong>Khuje Nin</strong> – your go-to platform for
        discovering the best products from trusted sources, all in one place.
      </p>
      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        We aim to make your online shopping experience simple, fast, and direct.
        No unnecessary sign-ups or confusing steps – just browse, find what you
        love, and buy directly through WhatsApp.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        Whether you're looking for daily essentials or unique finds, we’re
        constantly updating our product list to serve you better.
      </p>
      <div className="mt-8">
        <p className="text-md text-gray-600">Contact us at:</p>
        <p className="text-md text-green-700 font-medium">
          WhatsApp: 01XXXXXXXXX
        </p>
        <p className="text-md text-green-700 font-medium">
          Email: support@khujenin.com
        </p>
      </div>
    </div>
  );
}
