import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

function QuantityButtons({ increase, decrease, amount }) {
  return (
    <Wrapper className="amount-btns">
      <button type="button" className="btn amount-btn" onClick={decrease}>
        <FaMinus />
      </button>
      <h3 className="amount">{amount}</h3>
      <button type="button" className="btn amount-btn" onClick={increase}>
        <FaPlus />
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  width: 100px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (min-width: 768px) {
    width: 140px;
  }
`;

export default QuantityButtons;
