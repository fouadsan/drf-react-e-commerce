import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { createOrder, resetOrder } from "../store/actions/order";
import { clearCart } from "../store/actions/cart";
import { CheckoutSteps, Message } from "../components";

function PlaceOrderPage() {
  const {
    order_loading: loading,
    order_error: error,
    order,
  } = useSelector((state) => state.order);

  const { items, total_amount, shipping_address, payment_method } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const shippingPrice = (total_amount > 100 ? 0 : 10).toFixed(2);
  const taxPrice = Number(0.082 * total_amount).toFixed(2);
  const totalPrice = (
    Number(total_amount) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: items,
        shippingAddress: shipping_address,
        paymentMethod: payment_method,
        itemsPrice: total_amount,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  useEffect(() => {
    if (order) {
      navigate(`/order/${order.id}`);
      dispatch(resetOrder());
      dispatch(clearCart());
    }
  }, [order, navigate, dispatch]);

  return (
    <Wrapper>
      <div className="container page-100">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h3>Shipping</h3>
                <p>
                  <strong>Shipping: </strong>
                  {shipping_address.address}, {shipping_address.city}
                  {"    "}
                  {shipping_address.postalCode}, {shipping_address.country}
                </p>
              </li>
              <li className="list-group-item">
                <h3>Payment Method</h3>
                <p>
                  <strong>Method: </strong>
                  {payment_method}
                </p>
              </li>
              <li className="list-group-item">
                <h3>Order Items</h3>
                {items.length === 0 ? (
                  <Message type={"info"} text={"Your Cart Is Empty"} />
                ) : (
                  <ul className="list-group list-group-flush">
                    {items.map((item, index) => {
                      const { id, name, image, amount, price } = item;
                      return (
                        <li key={index} className="list-group-item">
                          <div className="row">
                            <div className="col-lg-1 col-md-2 col-2">
                              <img
                                src={image}
                                alt={name}
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="col-md-6 col-5">
                              <Link to={`/products/${id}`}>{name}</Link>
                            </div>
                            <div className="col-md-4 col-5">
                              {amount} X ${price} = $
                              {(amount * price).toFixed(2)}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card border-secondary mb-3">
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h3>Order Summary</h3>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Items Price:</div>
                      <div className="col">${total_amount.toFixed(2)}</div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Shipping:</div>
                      <div className="col">${shippingPrice}</div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Tax:</div>
                      <div className="col">${taxPrice}</div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Total:</div>
                      <div className="col">${totalPrice}</div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    {error.status && (
                      <Message type={"warning"} text={error.msg} />
                    )}
                  </li>
                  <li className="list-group-item">
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={items === 0}
                      onClick={handlePlaceOrder}
                    >
                      {loading ? (
                        <div
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <span>Place Order</span>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default PlaceOrderPage;
