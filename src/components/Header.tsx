import { background } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AppHeader = styled.header`
  display: flex;
  background-color: #696969;
  flex-direction: row; // Change this line
  align-items: center;
  justify-content: left;
  font-size: calc(10px + 2vmin);
`;

const StyledButton = styled.button`
  color: white;
  background-color: #696969;
  padding: 20px;
  margin: 0 10px; // Add this line
  font-size: 20px;

`;
const HeaderStyle = styled.div`
color: white;
background-color: #696969;
text-align: left;
padding: 20px;
padding-left: 0px;
padding-right: 450px;
font-size: 24px; //見出しのサイズ
margin: 0px;`

const Picture = styled.picture`
padding-left: 10px;
width: 80px;
heights: 50px;`

function Header() {
  return (
    <AppHeader>
      <Picture><img src="https://s3-alpha-sig.figma.com/img/e3c8/ab3d/0f0b4d9a35c599088de6b71baee5120e?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W7h7-aYIC59BfOvlIrGJlQe605LUY9y1O0mZY-qIyfpqeTAcKGVgmvxggUAZrNgh2ToS2jf6NdrFPR-8Tn8BAG7y2FD3RIYO7wjpIDo6YuUkw6hqb39vbXGQ6q0DNSONAunyDZL1zw7H5c5A-np7DGHHfxTQRFZ3kDSQ2NlpZu69VtkG~R3c2Cc0opMeR8dvOW6~xH-NZfWH9uA-LRi3hKjj~9p5tTPewnhDoPihO06iXgTjCn0ClWH9-wu0foFTY23dWSSH-Dg2QqqSPWdS~aqLqO37jhsh8H3rZpbj1YDSoNr4oGFUyyfVe5FDd~akS8NEzYSR~54aUxHPNaXVPw__"></img></Picture>
      <HeaderStyle>GDSC　メンバー管理サイト</HeaderStyle>
      <Link to="/">
        <StyledButton>HOME</StyledButton>
      </Link>
      <Link to="/register">
        <StyledButton>Regester</StyledButton>
      </Link>
      <Link to="/members">
        <StyledButton>Members</StyledButton>
      </Link>
    </AppHeader>
  );
}

export default Header;
