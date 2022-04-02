import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Wrapper>
      <footer>
        <div className="container">
          <div className="row">
            <div className="column text-center">
              Copyright {new Date().getFullYear()} &copy; Ushop
            </div>
          </div>
        </div>
      </footer>
    </Wrapper>
  );
}

const Wrapper = styled.footer``;

export default Footer;
