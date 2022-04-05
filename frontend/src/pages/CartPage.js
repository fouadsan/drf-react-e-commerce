import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";

import * as cartActions from "../store/actions/cart";

function CartPage() {
  const { items, total_items, total_amount } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="container page-100">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">item</th>
              <th scope="col">price</th>
              <th scope="col">quantity</th>
              <th scope="col">subtotal</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((cartItem) => {
                console.log(cartItem);
                const { name, image, price, amount } = cartItem;
                return (
                  <tr class="table-active">
                    <th scope="row">
                      <img src={image} alt={name} />
                    </th>
                    <th scope="row">
                      <p>{name}</p>
                    </th>
                    <td scope="row">
                      <p>${amount}</p>
                    </td>
                    <td scope="row">- 1 +</td>
                    <td scope="row">
                      <p>${amount}</p>
                    </td>
                    <td scope="row">
                      <button
                        type="button"
                        className="btn btn-outline-primary remove-btn"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
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
`;

export default CartPage;
