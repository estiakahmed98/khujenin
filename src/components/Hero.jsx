import React from "react";

const Hero = () => {
  return (
    <section
      className="relative h-96 w-full"
      style={{ backgroundImage: "url(./hero.jpg)" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex flex-col justify-center items-center text-center text-white h-full">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          Welcome to Khuje Nin
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Discover amazing products with great deals.
        </p>
        <a
          href="/category/all-products"
          className="bg-green-500 text-white py-3 px-6 rounded-full text-lg hover:bg-green-600 transition"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default Hero;
