import React from "react";
import styled from "styled-components";

import { PRODUCTS } from "../utils/data";
import { ProductCard } from "../components";

function HomePage() {
  return (
    <Wrapper>
      <div className="container page-100">
        <h1>Latest Products</h1>
        <div className="row">
          {PRODUCTS.map((product) => {
            return (
              <div
                key={product.id}
                className="col-xl-3 col-lg-4 col-md-6 col-12"
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  padding-top: 12px;
  padding-bottom: 12px;
`;

export default HomePage;
