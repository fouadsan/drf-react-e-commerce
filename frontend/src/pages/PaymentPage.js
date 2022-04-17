import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { savePaymentMethod } from "../store/actions/cart";
import { FormContainer, CheckoutSteps } from "../components";

function PaymentPage() {
  const { shipping_address } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shipping_address.address) {
    navigate("/shipping");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Wrapper>
      <div className="container page-100">
        <h1>Payment</h1>
        <CheckoutSteps step1 step2 step3 />
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <legend className="mt-4">Select Method</legend>
            <div className="form-check">
              <div className="form-check-label">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="form-check-input"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  checked
                />
                PayPal or Credit Card
              </div>
            </div>
          </fieldset>

          <button type="submit" className="btn btn-primary my-3">
            Continue
          </button>
        </form>
        <FormContainer></FormContainer>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.main``;

export default PaymentPage;
