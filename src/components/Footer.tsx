import styled from "styled-components";

const StyledFooter = styled.footer`
  text-align: center;
  padding: 10px;
  width: 100%;
  text-align: right;
`;

function Footer() {
  return (
    <StyledFooter>
      <p>© 2024 GDSCchuo</p>
    </StyledFooter>
  );
}

export default Footer;
