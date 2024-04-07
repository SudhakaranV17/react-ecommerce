import React, { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/products")
      .then((res) => res.json())
      .then((res) => setProducts(res.products));
  }, [products]);

  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
    </Fragment>
  );
}

export default Home;
