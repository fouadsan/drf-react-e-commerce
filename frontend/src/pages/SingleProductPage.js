import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import * as singleProductActions from "../store/actions/singleProduct";
import { Rating, Loading, Message } from "../components";

function SingleProductPage() {
  let { id } = useParams();

  const {
    product_loading: loading,
    product_error: error,
    product,
  } = useSelector((state) => state.singleProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleProductActions.fetchSingleProduct(id));
  }, [dispatch, id]);

  return (
    <Wrapper>
      <div className="container page-100">
        <Link to={"/"} className="btn btn-secondary my-3">
          Go Back
        </Link>
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <Loading />
          </div>
        ) : error.status ? (
          <div className="mt-5">
            <Message type={"warning"} text={error.msg} />
          </div>
        ) : product ? (
          <div className="row">
            <div className="col-md-6">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="col-md-3">
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
            <div className="col-md-3">
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
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <button
                      type="button"
                      className="btn btn-primary card-btn"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-btn {
    width: 100%;
  }
`;

export default SingleProductPage;
