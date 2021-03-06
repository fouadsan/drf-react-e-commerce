import React from "react";
import styled from "styled-components";

import CartItem from "./CartItem";

function CartTable({ items }) {
  return (
    <Wrapper className="table-responsive cart-table">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">item</th>
            <th scope="col" className="text-center">
              price
            </th>
            <th scope="col" className="text-center">
              quantity
            </th>
            <th scope="col" className="text-center">
              subtotal
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((cartItem) => {
              const { id, name, image, price, amount } = cartItem;
              return (
                <CartItem
                  key={id}
                  pid={id}
                  name={name}
                  image={image}
                  price={price}
                  amount={amount}
                />
              );
            })}
        </tbody>
      </table>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 1rem;

  img {
    width: 75px;
    height: 75px;
    object-fit: cover;
    border-radius: 5px;
  }

  p {
    margin-top: 1rem;
  }

  .remove-btn {
    margin-top: 0.5rem;
  }

  @media screen and (min-width: 576px) {
    margin-bottom: 0;
  }
`;

export default CartTable;
