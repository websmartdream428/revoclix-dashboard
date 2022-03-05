import styled from "styled-components";

export const ButtonWrapper = styled.div`
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding: 0 10px;
  transition: all 0.3s;
  color: #fff;
  display: none;
  :hover {
    background-color: #00000020;
  }
  :active {
    background-color: #00000040;
  }
  @media screen and (max-width: 1024px) {
    display: flex;
  }
`;
