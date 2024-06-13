import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

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
              src="https://s3-alpha-sig.figma.com/img/90e2/9c9d/5e9868c346f6b006ae4aefdd010a801f?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HqwZzyxvR8y-JHJMYeO4u2fLT0bjqXoC3bvGWvxjAY0QgwXiouekaWyD4e~hpQ-JdlQctE1G5GXSyXvnU0MTrgtXBLMnjpe9QDnDFeQz1iscl5ScIY0DomuV9pQgOR7DDgztw3EHITMiHf6MrMDDinVB-nwR3h27IKT~w~DKexllPZ5KF6ySxSFTNQ~r46M~1PJXwDUJk2K-uySlIPSDiXH1QcD8RMTA0JsjwBxNTbNkqLyye0ZWCRdLnrkvm47EH3xblmpaT9vFlmez52LvIo8d~p9kjgUkOU1VUwgP2~mijYBWDExBV8l~EOOuL05o5Dsr2K0S-evqhJBtha5cQg__"
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
      <Link to="/members">
        <Astyle>
          <Icon2>
            <img
              src="https://s3-alpha-sig.figma.com/img/d929/eca2/13c09fbfa4cf31835a81a543059784a2?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z50CrsYyMR5kvC2BG48-vDtKU5TQFdgqNwWMzXkrqw2iYsSc-0MahrzxRfuOFr4S-HdhiO8Vq8juBgrE2k4JvDn51iM8ZLqzxWu67jbyyAD~55x4U38ke2CHoG2qE7Ia9yXbOduUevIVYpIcFb51c57B8FE0fCtk5ZiStMVr-oftyaqVcfyBfj2Ax5Xggt0a-y9puOuyo2z0xvIjWYDpanMAPfWUgzAS4xYreeczc-Nm-IGAqtv0JTBzAaU0yvgwDK3t7W6GYxQAZTXdtqQzQ4KiTmCXPT4~87woUTzqRwRhaR-FQZRymy~sU4cW5aXIomQLMPiSA41gddsOL0Votw__"
              alt="three"
            ></img>
          </Icon2>
          <Icon2Style>メンバー一覧</Icon2Style>
        </Astyle>
      </Link>
    </HomeBox>
  );
}

export default Home;
