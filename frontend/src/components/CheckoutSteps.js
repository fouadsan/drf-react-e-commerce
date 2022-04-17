import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  console.log(step2);
  return (
    <Wrapper>
      <ul className="nav nav-pills justify-content-center p-4 mb-4">
        <li className="nav-item me-4">
          <NavLink
            to={"/login"}
            className={`nav-link ${step1 ? "active" : "disabled"}`}
          >
            Login
          </NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink
            to={"/shipping"}
            className={`nav-link ${step2 ? "active" : "disabled"}`}
          >
            Shipping
          </NavLink>
        </li>

        <li className="nav-item me-4">
          <NavLink
            to={"/payment"}
            className={`nav-link ${step3 ? "active" : "disabled"}`}
          >
            Payment
          </NavLink>
        </li>

        <li className="nav-item me-4">
          <NavLink
            to={"/placeorder"}
            className={`nav-link ${step4 ? "active" : "disabled"}`}
          >
            Place Order
          </NavLink>
        </li>
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .nav-pills {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .nav-item {
    margin-bottom: 0.5rem;
  }

  .nav-link {
    width: 120px;
  }

  @media screen and (min-width: 768px) {
    .nav-pills {
      flex-direction: row;
    }
  }
`;

export default CheckoutSteps;
