import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CartTotals({ totalItems, totalAmount }) {
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            Total Items :<span>{totalItems}</span>
          </h5>
          <hr />
          <h4>
            Order Total :<span>${totalAmount.toFixed(2)}</span>
          </h4>
        </article>
        <Link to="/checkout" className="btn btn-outline-primary">
          proceed to checkout
        </Link>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid #839496;
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5 {
    display: grid;
    grid-template-columns: 200px 1fr;
    font-weight: 600;
  }

  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
