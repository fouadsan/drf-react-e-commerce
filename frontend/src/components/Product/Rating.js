import React from "react";
import styled from "styled-components";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

function Rating({ value, text }) {
  return (
    <Wrapper className="d-flex">
      <div className="col-6 text-primary">
        <span>
          {value >= 1 ? (
            <BsStarFill />
          ) : value >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <BsStarFill />
          ) : value >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <BsStarFill />
          ) : value >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <BsStarFill />
          ) : value >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <BsStarFill />
          ) : value >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      </div>
      <div className="col-6">
        <span className="rating-text">{text && text}</span>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  span {
    margin: 0.1rem;
  }

  svg {
    font-size: 1.1rem;
  }

  .rating-text {
    line-height: 1.9em;
  }
`;

export default Rating;
