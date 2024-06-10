import React from "react";
import Header from "../components/Header";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const BodyStyle = styled.div`
display: inline-flex;
clip-path: polygon(0 0px, 760px 0, 500px 900px, 0 100%);
line-height: 100%;
color: white;
background-color: #c0c0c0;
padding: 120px;
padding-left: 30px;
padding-right: 400px;
padding-bottom: 40px;
font-size: 80px;`

const TextStyle = styled.div`
display: inline-block;
color: white;
clip-path: polygon(0 0px, 668px 0, 500px 550px, 0 100%);
background-color: #c0c0c0;
padding: 0px;
padding-left: 30px;
padding-right: 520px;
padding-bottom: 200px;
font-size: 20px;`

const Icon1Style = styled.div`
display: inline-flex;
text-align: right;
background-color: white;
padding: 30px;
padding-left: 30px;
padding-right: 100px;
padding-botton: 0px;
font-size: 20px;`

const Icon2Style = styled.div`
display: inline-flex;
text-align: right;
background-color: white;
padding: 30px;
padding-left: 30px;
padding-right: 0px;
padding-botton: 100px;
font-size: 20px;`

function Home() {
  return (
    <div>
      <BodyStyle>GDSC<br />membership</BodyStyle>
      <Link to="/member1">
       <Icon1Style><img src="src/components/img/one.png" alt="one"></img>メンバー登録</Icon1Style>
      </Link>
      <TextStyle>説明テキストテキストテキストテキ<br />ストテキストテキストテキストテキ<br />スト</TextStyle>
      <Link to="/member2">
      <Icon2Style><img src="src/components/img/three.png" alt="three"></img>メンバー一覧</Icon2Style>
      </Link>
    </div>
    );
  }


export default Home;
