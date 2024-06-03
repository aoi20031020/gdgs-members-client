import React from "react";
import Header from "../components/Header";
import { styled } from "styled-components";

const HeaderStyle = styled.div`
font-size: 100px;`
function Home() {
  return (
    <header>
    <div>
      <h1>GDSC　メンバー管理サイト</h1>
      <p>This is the home page.</p>
      <HeaderStyle> aaaaaa</HeaderStyle>
    </div>
    </header>
    
    );
  }

export default Home;
