import styled from "styled-components";
import { FlagProps } from "types/FlagProps";

export const SidebarWrapper = styled.div<FlagProps>`
  padding-top: 70px;
  width: 240px;
  position: fixed;
  background: #fff;
  left: 0;
  height: 100vh;
  z-index: 9;
  transition: all 0.3s;
  box-shadow: 1px 0px 20px rgb(0 0 0 / 8%);
  @media screen and (max-width: 1024px) {
    left: ${({ flag }) => (flag ? "0" : "-240px")};
  }
`;

export const SidebarOverLay = styled.div<FlagProps>`
  display: none;
  position: fixed;
  transition: all 0.3s;
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #00000080;
  z-index: 999;
  @media screen and (max-width: 1024px) {
    display: block;
    opacity: ${({ flag }) => (flag ? "1" : "0")};
    visibility: ${({ flag }) => (flag ? "visible" : "hidden")};
  }
`;
