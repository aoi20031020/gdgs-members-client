import styled from "styled-components";

const StyledFooter = styled.footer`
  text-align: center;
  padding: 10px;
  width: 100%;
  background-color: #696969; // 背景色を追加して視認性を高める

  @media (max-width: 768px) {
    padding: 20px; // モバイルでパディングを調整
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <p>© 2025 GDGsChuo</p>
    </StyledFooter>
  );
}

export default Footer;
