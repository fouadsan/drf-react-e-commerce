import React from "react";
import styled from "styled-components";

function FormContainer({ children }) {
  return (
    <Wrapper>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-12">{children}</div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default FormContainer;
