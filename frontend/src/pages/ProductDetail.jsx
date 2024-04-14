import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail({ cartItems, setCartItems }) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/products/" + id)
      .then((res) => res.json())
      .then((res) => setProduct(res.product));
  }, []);
  function addToCart() {
    const itemExist = cartItems.find((item) => item.product._id == product._id);
    if (!itemExist) {
      const newItem = { product, quantity };
      setCartItems((prev) => [...prev, newItem]);
    }
  }
  function increaseQty() {
    if (product.stock == quantity) {
      return;
    }
    setQuantity((prev) => prev + 1);
  }
  function decreaseQty() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }
  return (
    product && (
      <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={product.images[0].image}
              alt="sdf"
              height="500"
              width="500"
            />
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product {product._id}</p>

            <hr />

            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.rating / 5) * 100}%` }}
              ></div>
            </div>

            <hr />

            <p id="product_price">$ {product.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty}>
                -
              </span>

              <input
                type="number"
                className="form-control count d-inline"
                value={quantity}
                readOnly
              />

              <span className="btn btn-primary plus" onClick={increaseQty}>
                +
              </span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              onClick={addToCart}
              disabled={product.stock == 0}
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status:{" "}
              <span id="stock_status">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>{product.desc}</p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>Amazon</strong>
            </p>

            <div className="rating w-50"></div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductDetail;
