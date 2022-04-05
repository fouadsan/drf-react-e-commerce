import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import * as cartActions from "../store/actions/cart";
import { CartTable, CartTotals, Message } from "../components";

function CartPage() {
  const { items, total_items, total_amount } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  useEffect(() => {
    dispatch(cartActions.countCartTotals());
  }, [dispatch, items]);

  if (total_items) {
    return (
      <main>
        <div className="container page-100">
          <CartTable items={items} />
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary">
              continue Shopping
            </button>
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={handleClearCart}
            >
              Clear Shopping Cart
            </button>
          </div>
          <CartTotals totalItems={total_items} totalAmount={total_amount} />
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <div className="container page-100">
          <div className="d-flex justify-content-center my-5">
            <div className="col-md-6 col-12 text-center">
              <h3>YOUR CART IS EMPTY</h3>
              <Link to="/" className="btn btn-primary mt-2">
                <strong>FILL IT</strong>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default CartPage;
