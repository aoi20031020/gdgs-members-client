import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext";
const BodyStyle = styled.div`
  display: inline-block;
  clip-path: polygon(0 0px, 760px 0, 500px 1000px, 0 100%);
  line-height: 100%;
  color: white;
  background-color: #c0c0c0;
  padding: 150px;
  padding-left: 30px;
  padding-right: 300px;
  padding-bottom: 10px;
  font-size: 80px;
`;

const TextStyle = styled.div`
  display: inline-block;
  color: white;
  clip-path: polygon(0 0px, 677px 0, 500px 610px, 0 100%);
  background-color: #c0c0c0;
  padding-top: 50px;
  padding-left: 30px;
  padding-right: 420px;
  padding-bottom: 170px;
  font-size: 20px;
`;

const Icon1Style = styled.div`
  display: inline-flex;
  background-color: white;
  padding-top: 230px;
  padding-left: 30px;
  padding-right: 100px;
  padding-bottom: 0px;
  font-size: 30px;
`;

const Icon2Style = styled.div`
  display: inline-flex;
  background-color: white;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 0px;
  padding-bottom: 0px;
  font-size: 30px;
`;

const Icon1 = styled.div`
  display: inline-flex;
  background-color: #c0c0c0;
  border-radius: 50%;
  margin-top: 200px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  width: 100px;
  heights: 100px;
`;

const Icon2 = styled.div`
  display: inline-flex;
  background-color: #c0c0c0;
  border-radius: 50%;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  width: 100px;
  heights: 100px;
`;

const Astyle = styled.div`
  display: inline-flex;
`;

const HomeBox = styled.div`
  height: 100vh;
`;

function Home() {
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();
  const handleMembersClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/members");
    } else {
      login();
    }
  };
  return (
    <HomeBox>
      <BodyStyle>
        GDSC
        <br />
        membership
      </BodyStyle>
      <Link to="/register">
        <Astyle>
          <Icon1>
            <img
              src={`${process.env.PUBLIC_URL}/images/one.png`}
              alt="one"
            ></img>
          </Icon1>
          <Icon1Style>メンバー登録</Icon1Style>
        </Astyle>
      </Link>
      <TextStyle>
        説明テキストテキストテキストテキ
        <br />
        ストテキストテキストテキストテキ
        <br />
        スト
      </TextStyle>
      <Astyle onClick={handleMembersClick}>
        <Icon2>
          <img
            src={`${process.env.PUBLIC_URL}/images/three.png`}
            alt="three"
          ></img>
        </Icon2>
        <Icon2Style>メンバー一覧</Icon2Style>
      </Astyle>
    </HomeBox>
  );
}

export default Home;
