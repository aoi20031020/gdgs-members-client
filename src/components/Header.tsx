import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AppHeader = styled.header`
  display: flex;
  height: 80px;
  line-height:80px;
  padding-right: 20px;
  flex-direction: row; // Change this line
  text-align:center;
  justify-content: flex-end;
  font-size: calc(10px + 1vmin);
  background-color: gray;
  color:#ffffff;

  .title{
    display:flex;
    margin-right:auto;
  }

  .title img{
    height: 50px;
    width: auto;
  }

  .title h1{
    margin-left : 10px;
    font-size: 1.5em;
    font-weight:bold;
  }

`;

const StyledButton = styled.button`
  margin: 0 10px; // Add this line
  padding-left:25px;
  padding-right:25px;
`;

function Header() {
  return (
    <AppHeader>
      <div className="title">
        <img src="/images/logo.png" alt="logo" className="titlename"/>
        <h1 >GDSC メンバー管理サイト</h1>
      </div>
      <Link to="/">
        <StyledButton>Home</StyledButton>
      </Link>
      <Link to="/register">
        <StyledButton>Register</StyledButton>
      </Link>
      <Link to="/members">
        <StyledButton>Members</StyledButton>
      </Link>
    </AppHeader>

  );
};

export default Header;
