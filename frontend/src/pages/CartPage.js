import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import * as cartActions from "../store/actions/cart";
import { CartTable, CartTotals } from "../components";

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
      <Wrapper>
        <div className="container page-100">
          <CartTable items={items} />
          <div className="d-flex justify-content-between btns-container">
            <Link to={"/"} className="btn btn-secondary">
              Continue Shopping
            </Link>
            <button
              type="button"
              className="btn btn-outline-warning clear-btn"
              onClick={handleClearCart}
            >
              Clear Shopping Cart
            </button>
          </div>
          <CartTotals totalItems={total_items} totalAmount={total_amount} />
        </div>
      </Wrapper>
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

const Wrapper = styled.main`
  .btns-container {
    flex-direction: column;
  }

  .clear-btn {
    margin-top: 1rem;
  }

  @media screen and (min-width: 348px) {
    .btns-container {
      flex-direction: row;
    }

    .clear-btn {
      margin-top: 0;
    }
  }
`;

export default CartPage;
