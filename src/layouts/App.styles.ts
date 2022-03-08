import styled from "styled-components";

export const AppWrapper = styled.div``;

export const AppContent = styled.div`
  height: 100vh;
  overflow-y: scroll;
  padding-left: 240px;
  padding-top: 70px;
  background: #eef5f9;
  transition: all 0.3s;

  @media screen and (max-width: 1024px) {
    padding-left: 0;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ffffff30;
    box-shadow: inset 1px 1px 2px transparent;
    border: 0.1px solid #ffffff30;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #1e88e5 !important;
    border-radius: 10px;
    box-shadow: inset 1px 1px 2px rgb(155 155 155 / 40%);
  }
`;
