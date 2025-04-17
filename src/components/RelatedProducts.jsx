import React from "react";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-green-800 mb-6">
        Related Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

{
  /* <RelatedProducts products={relatedItems} />
Where relatedItems can be filtered like:

js
Copy
Edit
const relatedItems = allProducts.filter(
  (p) => p.category === currentProduct.category && p.id !== currentProduct.id
); */
}
