import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <Spinner className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
`;

export default Loading;
