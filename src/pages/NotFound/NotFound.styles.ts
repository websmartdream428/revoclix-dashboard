import styled from "styled-components";

export const NotFoundWrapper = styled.div`
  z-index: 9999999999;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-y: hidden;
  text-align: center;
  * {
    transition: all 0.3s;
  }
  h1 {
    font-size: 210px;
    font-weight: 900;
    margin-top: 80px;
    margin-bottom: 20px;
    line-height: 210px;
    color: #455a64;
    text-align: center;
  }
  h3 {
    color: #455a64;
    font-size: 20px;
  }
  p {
    color: #455a64a0;
    font-size: 16px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 150px;
      line-height: 150px;
    }
    h3 {
      color: #455a64;
      font-size: 18px;
    }
    p {
      width: 90%;
      margin: auto;
    }
  }
`;
