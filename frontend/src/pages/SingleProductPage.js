import React from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";

import { Rating } from "../components";
import { PRODUCTS } from "../utils/data";

function SingleProductPage() {
  let { id } = useParams();
  const { name, image, description, rating, price, numReviews, countInStock } =
    PRODUCTS.find((prod) => prod.id === parseInt(id));
  return (
    <Wrapper className="container page-100">
      <Link to={"/"} className="btn btn-secondary my-3">
        Go Back
      </Link>
      <div className="row">
        <div className="col-md-6">
          <img src={image} alt={name} />
        </div>
        <div className="col-md-3">
          <ul class="list-group-flush">
            <li class="list-group-item">{name}</li>
            <li class="list-group-item">
              <Rating value={rating} text={`${numReviews} reviews`} />
            </li>
            <li class="list-group-item">Price: ${price}</li>
            <li class="list-group-item">{description}</li>
            <li class="list-group-item">And a fifth one</li>
          </ul>
        </div>
        <div className="col-md-3">
          <div className="card">
            <ul class="list-group-flush m-0">
              <li class="list-group-item">
                <div className="row">
                  <div className="col">Price:</div>
                  <div className="col">
                    <strong>${price}</strong>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div className="row">
                  <div className="col">Status:</div>
                  <div className="col">
                    <strong>
                      {countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={countInStock === 0}
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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    width: 100%;
  }
`;

export default SingleProductPage;
