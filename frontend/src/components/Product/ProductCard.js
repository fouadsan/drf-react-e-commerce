import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Rating from "./Rating";

function ProductCard({ product }) {
  const { id, name, image, rating, price, numReviews } = product;
  return (
    <Wrapper className="card  my-3 p-3">
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} className="card-img-top" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${id}`}>
          <h5 className="card-title">{name}</h5>
        </Link>
        <div className="card-text my-3">
          <Rating value={rating} text={`${numReviews} reviews`} />
        </div>
        <h3 className="card-text my-3">${price}</h3>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default ProductCard;
