import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as cartActions from "../store/actions/cart";
import Rating from "./product/Rating";
import QuantityButtons from "./cart/QuantityButtons";

function SingleProduct({ product }) {
  const [amount, setAmount] = useState(1);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > product.countInStock) {
        tempAmount = product.countInStock;
      }
      return tempAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  const handleAddToCart = () => {
    dispatch(cartActions.addToCart(product, amount));
    navigate("/cart");
  };

  return (
    <Wrapper>
      <div className="row">
        <div className="col-lg-6 col-12 image-container">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          <ul className="list-group-flush">
            <li className="list-group-item">{product.name}</li>
            <li className="list-group-item">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </li>
            <li className="list-group-item">Price: ${product.price}</li>
            <li className="list-group-item">{product.description}</li>
            <li className="list-group-item">And a fifth one</li>
          </ul>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          <div className="card">
            <ul className="list-group-flush m-0">
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Price:</div>
                  <div className="col">
                    <strong>${product.price}</strong>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Status:</div>
                  <div className="col">
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </div>
                </div>
              </li>
              {product.countInStock > 0 && (
                <li className="list-group-item">
                  <div className="row">
                    <div className="col my-1">Qty:</div>
                    <div className="col">
                      <QuantityButtons
                        increase={increase}
                        decrease={decrease}
                        amount={amount}
                      />
                    </div>
                  </div>
                </li>
              )}
              <li className="list-group-item">
                <button
                  type="button"
                  className="btn btn-primary card-btn"
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .image-container {
    margin-bottom: 1rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-btn {
    width: 100%;
  }
`;

export default SingleProduct;
