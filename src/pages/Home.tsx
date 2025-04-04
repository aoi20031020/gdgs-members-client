import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// 左右分割デザイン
const Wrapper = styled.div<{ wrapperHeight: string }>`
  display: flex;
  flex-direction: row;
  height: ${({ wrapperHeight }) => wrapperHeight}; // 動的に高さを設定

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
  cursor: pointer;

  :hover {
    background-color: #696969; // ホバー時の背景色
    border-radius: 10px; // ホバー時の角丸
    transition: 0.3s; // ホバー時のトランジション
    transform: scale(1.05); // ホバー時の拡大効果
  }

  @media (max-width: 790px) {
    max-width: 100%; // モバイルでも最大幅を調整
  }
`;

const HomeBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

function Home() {
  const [wrapperHeight, setWrapperHeight] = useState("100vh"); // 初期値として100vhを設定
  const navigate = useNavigate();

  // ヘッダーとフッターの高さを計算
  useEffect(() => {
    const calculateHeight = () => {
      const headerHeight = document.querySelector("header")?.clientHeight || 0;
      const footerHeight = document.querySelector("footer")?.clientHeight || 0;

      const availableHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;
      setWrapperHeight(availableHeight);
    };

    // ページのロード時とウィンドウリサイズ時に高さを再計算
    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []); // マウント時にのみ実行

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
      <Wrapper wrapperHeight={wrapperHeight}>
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
            </Astyle>
            <ButtonText>メンバー登録</ButtonText>
          </Link>
          <Link to="members">
            <Astyle onClick={handleMembersClick}>
              <IconStyle>
                <img
                  src={`${process.env.PUBLIC_URL}/images/three.png`}
                  alt="three"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </IconStyle>
            </Astyle>
            <ButtonText>メンバー一覧</ButtonText>
          </Link>
        </RightSide>
      </Wrapper>
    </HomeBox>
  );
}

export default Home;
