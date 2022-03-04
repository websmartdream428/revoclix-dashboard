import styled from "styled-components";

export const UserLogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    background-color: #00000020;
  }
  :active {
    background-color: #00000040;
  }
`;

export const UserAvatar = styled.img`
  width: 40px;
  border-radius: 9999px;
  height: 40px;
  margin-right: 10px;
`;

export const UserName = styled.span`
  font-size: 20px;
  color: white;
`;
