import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// 左右分割デザイン
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;

  @media (max-width: 1000px) {
    flex-direction: column; // モバイルでは縦並び
  }
`;

const LeftSide = styled.div`
  flex: 0.4; // 左側を40%に設定
  background-color: #c0c0c0; // グレー背景
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 1000px) {
    flex: 0.15; // モバイルでは左側を15%に設定
  }
`;

const RightSide = styled.div`
  flex: 0.6; // 右側を60%に設定
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 42px; // ボタン間の間隔を調整

  @media (max-width: 1000px) {
    flex-direction: column; // モバイルでは縦並び
    padding: 10px 0; // モバイルではパディングを調整
    gap: 20px; // ボタン間の間隔を調整
    justify-content: flex-start;
    align-items: center;
  }
`;

const Title = styled.div`
  font-size: 80px;
  color: white;
  text-align: center;

  @media (max-width: 790px) {
    font-size: 40px; // モバイルではフォントサイズを小さく
  }
`;

const IconStyle = styled.div`
  display: inline-flex;
  background-color: #c0c0c0; // グレー背景
  padding: 10px; // アイコンのパディングを調整
  margin-bottom: 10px; // アイコンとテキストの間隔調整
  font-size: 32px; // アイコンのサイズを調整
  border-radius: 50%;
  align-items: center;
  justify-content: center;

  width: 150px; // アイコンの幅を調整
  height: 150px; // アイコンの高さを調整

  @media (max-width: 790px) {
    padding: 8px; // モバイルでもアイコンのパディングを調整
    font-size: 18px; // アイコンのサイズ調整
    width: 100px; // モバイルでアイコンの幅を小さく
    height: 100px; // モバイルでアイコンの高さを小さく
  }
`;

const ButtonText = styled.div`
  font-size: 24px; // ボタンのテキストサイズを調整
  text-align: center;

  @media (max-width: 790px) {
    font-size: 14px; // モバイルではテキストサイズを小さく
  }
`;

const Astyle = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  max-width: 200px; // ボタンの最大幅を設定

  @media (max-width: 790px) {
    max-width: 100%; // モバイルでも最大幅を調整
  }
`;

const HomeBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

function Home() {
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
    <HomeBox>
      <Wrapper>
        {/* 左側：タイトルと背景グレー */}
        <LeftSide>
          <Title>
            GDGsChuo
            <br />
            membership
          </Title>
        </LeftSide>

        {/* 右側：ボタン */}
        <RightSide>
          <Link to="register">
            <Astyle>
              <IconStyle>
                <img
                  src={`${process.env.PUBLIC_URL}/images/one.png`}
                  alt="one"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </IconStyle>
              <ButtonText>メンバー登録</ButtonText>
            </Astyle>
          </Link>

          <Astyle onClick={handleMembersClick}>
            <IconStyle>
              <img
                src={`${process.env.PUBLIC_URL}/images/three.png`}
                alt="three"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </IconStyle>
            <ButtonText>メンバー一覧</ButtonText>
          </Astyle>
        </RightSide>
      </Wrapper>
    </HomeBox>
  );
}

export default Home;
