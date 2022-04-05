import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

import * as cartActions from "../../store/actions/cart";
import QuantityButtons from "./QuantityButtons";

function CartItem({ pid, name, image, price, amount }) {
  const dispatch = useDispatch();

  const increase = () => {
    dispatch(cartActions.toggleAmount(pid, "inc"));
  };
  const decrease = () => {
    dispatch(cartActions.toggleAmount(pid, "dec"));
  };

  const removeItem = () => {
    dispatch(cartActions.removeFromCart(pid));
  };

  return (
    <tr className="table-active">
      <th className="text-center">
        <img src={image} alt={name} />
      </th>
      <th>
        <p>{name}</p>
      </th>
      <th className="text-center">
        <p>${price}</p>
      </th>
      <td>
        <div className="d-flex justify-content-center my-2">
          <QuantityButtons
            increase={increase}
            decrease={decrease}
            amount={amount}
          />
        </div>
      </td>
      <th className="text-center">
        <p>${(price * amount).toFixed(2)}</p>
      </th>
      <td>
        <button
          type="button"
          className="btn btn-outline-warning remove-btn"
          onClick={removeItem}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
