import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../AuthContext";

const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #696969;
  align-items: center;
  width: 100%;
  height: 96px;
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    height: auto; // モバイルで高さを自動調整
  }
`;

const StyledButton = styled.button`
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    // ホバー時の背景色
    background-color: #c0c0c0;
    color: black;
    border-radius: 6px; // ホバー時の角丸
    transition: 0.4s; // ホバー時のトランジション
  }
  @media (max-width: 768px) {
    font-size: 14px; // モバイルでフォントサイズを小さく
    padding: 8px 16px; // ボタンのパディングを小さく
  }
`;

const TitleStyle = styled.div`
  color: white;
  text-align: left;
  padding: 20px;
  font-size: 24px;
  margin: 0px;

  @media (max-width: 768px) {
    font-size: 18px; // モバイルでフォントサイズを小さく
    padding: 10px;
    text-align: center; // モバイルでタイトルを中央に
  }
`;

const Picture = styled.div`
  display: flex;
  width: 100%;
  max-width: 80px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 60px; // モバイルでロゴを小さく
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px; // ボタン間のスペースを調整

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between; // ボタンを横並びに
    margin-top: 10px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    justify-content: center; // モバイルでタイトルを中央に
    width: 100%;
    margin-bottom: 10px;
  }
`;

function Header() {
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();
  const handleMembersClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isAuthenticated = !!sessionStorage.getItem("authToken");
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/members");
      }, 100); // Small delay for smoother navigation
    } else {
      navigate("/login");
    }
  };

  return (
    <AppHeader>
      <TitleBox>
        <Picture>
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} />
          </Link>
        </Picture>
        <TitleStyle>GDGsChuo Membership</TitleStyle>
      </TitleBox>
      <ButtonBox>
        <Link to="/">
          <StyledButton>HOME</StyledButton>
        </Link>
        <Link to="/register">
          <StyledButton>Register</StyledButton>
        </Link>
        <StyledButton onClick={handleMembersClick}>Members</StyledButton>
      </ButtonBox>
    </AppHeader>
  );
}

export default Header;
