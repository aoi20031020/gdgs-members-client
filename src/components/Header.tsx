import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AppHeader = styled.header`
  display: flex;
  flex-direction: row; // Change this line
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

const StyledButton = styled.button`
  margin: 0 10px; // Add this line
`;
const HeaderStyle = styled.div`
fontsize: 100px;`
function Header() {
  return (
    <AppHeader>
      <Link to="/">
        <StyledButton>Home</StyledButton>
      </Link>
      <Link to="/register">
        <StyledButton>登録</StyledButton>
      </Link>
      <Link to="/members">
        <StyledButton>一覧</StyledButton>
      </Link>
    </AppHeader>
  );
}

export default Header;
