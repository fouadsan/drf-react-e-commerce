import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { saveShippingAddress } from "../store/actions/cart";
import { CheckoutSteps, Message } from "../components";

function PlaceOrderPage() {
  const { items, total_amount, shipping_address, payment_method } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="container page-100">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h2>Shipping</h2>
                <p>
                  <strong>Shipping: </strong>
                  {shipping_address.address}, {shipping_address.city}
                  {"    "}
                  {shipping_address.postalCode}, {shipping_address.country}
                </p>
              </li>
              <li className="list-group-item">
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {payment_method}
                </p>
              </li>
              <li className="list-group-item">
                <h2>Order Items</h2>
                {items.length === 0 ? (
                  <Message type={"info"} text={"Your Cart Is Empty"} />
                ) : (
                  <ul className="list-group list-group-flush">
                    {items.map((item, index) => {
                      const { id, name, image, amount, price } = item;
                      return (
                        <li key={index} className="list-group-item">
                          <div className="row">
                            <h3>{name}</h3>
                            <div className="col-md-1 col-2">
                              <img
                                src={image}
                                alt={name}
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="col">
                              <Link to={`/products/${id}`}>{name}</Link>
                            </div>
                            <div className="col-md-4">
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
                    <h2>Order Summary</h2>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Items:</div>
                      <div className="col">${total_amount}</div>
                    </div>
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
`;

export default PlaceOrderPage;
