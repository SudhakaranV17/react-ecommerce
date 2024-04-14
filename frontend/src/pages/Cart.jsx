import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {
  const [complete, setComplete] = useState(true);
  const items = cartItems;
  console.log(items);
  function increaseQty(item) {
    if (item.product.stock == item.quantity) {
      return;
    }
    const updatedItems = items.map((i) => {
      if (i.product._id == item.product._id) {
        i.quantity++;
      }
      return i;
    });
    setCartItems(updatedItems);
  }
  function decreaseQty(item) {
    if (item.quantity > 1) {
      const updatedItems = items.map((i) => {
        if (i.product._id == item.product._id) {
          i.quantity--;
        }
        return i;
      });
      setCartItems(updatedItems);
    }
    return;
  }
  function removeItem(item) {
    const updatedItems = items.filter((i) => {
      if (i.product._id !== item.product._id) {
        return true;
      }
    });
    setCartItems(updatedItems);
  }
  function createOrder() {
    fetch(import.meta.env.VITE_API_URL + "/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    }).then(() => {
      setCartItems([]);
      setComplete(true);
    });
  }
  return cartItems.length > 0 ? (
    <>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length}</b>
        </h2>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {items.map((item) => (
              <Fragment key={item.product._id}>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.product.images[0].image}
                        alt={item.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={"/product/" + item.product._id}>
                        {item.product.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">$ {item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.quantity}
                          readOnly
                        />

                        <span
                          className="btn btn-primary plus"
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() => removeItem(item)}
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {items.reduce((acc, total) => acc + total.quantity, 0)}
                  <span> </span>(Units)
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">
                  ${" "}
                  {items.reduce(
                    (acc, total) => acc + total.product.price * total.quantity,
                    0
                  )}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={createOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : !complete ? (
    <h2 className="text-center my-5">
      Your cart is <b>Empty</b>
    </h2>
  ) : (
    <Fragment>
      <h2 className="text-center my-5">
        Order Completed ! <br />
        <p>Your Order has been Placed Successfully</p>
      </h2>
    </Fragment>
  );
}

export default Cart;
