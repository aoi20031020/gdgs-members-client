import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #f8f9fa;
  text-align: center;
  padding: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

function Footer() {
  return (
    <StyledFooter>
      <p>© 2022 Your Company</p>
    </StyledFooter>
  );
}

export default Footer;
