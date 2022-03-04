import styled from "styled-components";
import { Link } from "react-router-dom";

export const AppLogoWrapper = styled.div`
  width: 240px;
  background: rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoTitle = styled(Link)`
  margin: 0;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 25px;
  letter-spacing: 3px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  span {
    font-weight: 300;
  }
`;
