import styled from "styled-components";

export const NavbarWrapper = styled.div`
  display: flex;
  position: fixed;
  background-color: #1e88e5;
  height: 70px;
  width: 100%;
  z-index: 10;
  box-shadow: 5px 0px 10px rgb(0 0 0 / 50%);
`;

export const NavbarSection = styled.div`
  padding: 0 10px;
  display: flex;
  justify-content: flex-end;
  width: calc(100vw - 260px);
  @media screen and (max-width: 1024px) {
    justify-content: space-between;
  }
`;
