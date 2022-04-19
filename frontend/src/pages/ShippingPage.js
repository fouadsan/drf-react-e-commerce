import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { saveShippingAddress } from "../store/actions/cart";
import { FormContainer, CheckoutSteps } from "../components";

function ShippingPage() {
  const { user } = useSelector((state) => state.user);
  const { shipping_address } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shipping_address.address);
  const [city, setCity] = useState(shipping_address.city);
  const [postalCode, setPostalCode] = useState(shipping_address.postalCode);
  const [country, setCountry] = useState(shipping_address.country);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <Wrapper>
      <div className="container page-100">
        <h1>Shipping</h1>
        <CheckoutSteps step1 step2 />
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="address" className="form-label mt-4">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address"
                value={address ? address : ""}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city" className="form-label mt-4">
                City
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter City"
                value={city ? city : ""}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode" className="form-label mt-4">
                Postal Code
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Postal Code"
                value={postalCode ? postalCode : ""}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country" className="form-label mt-4">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Country"
                value={country ? country : ""}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary my-3">
              Continue
            </button>
          </form>
        </FormContainer>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main``;

export default ShippingPage;
