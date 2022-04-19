import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import * as productsActions from "../store/actions/products";
import { Loading, Message } from "../components";
import { ProductCard } from "../components";

function HomePage() {
  const {
    products_loading: loading,
    products_error: error,
    products,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.fetchProducts());
    dispatch(productsActions.fetchProducts());
  }, [dispatch]);

  return (
    <Wrapper>
      <div className="container page-100">
        <h1>Latest Products</h1>
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <Loading />
          </div>
        ) : error.status ? (
          <div className="mt-5">
            <Message type={"warning"} text={error.msg} />
          </div>
        ) : (
          <div className="row">
            {products.length ? (
              products.map((prod) => {
                return (
                  <div
                    key={prod.id}
                    className="col-xl-3 col-lg-4 col-md-6 col-12"
                  >
                    <ProductCard product={prod} />
                  </div>
                );
              })
            ) : (
              <div className="text-center mt-5">
                <h3>No Product Found.</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  padding-top: 12px;
  padding-bottom: 12px;
`;

export default HomePage;
