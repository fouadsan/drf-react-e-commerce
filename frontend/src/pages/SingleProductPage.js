import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import * as singleProductActions from "../store/actions/singleProduct";
import { Loading, Message, SingleProduct } from "../components";

function SingleProductPage() {
  const { id } = useParams();

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
          <SingleProduct product={product} />
        ) : null}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main``;

export default SingleProductPage;
