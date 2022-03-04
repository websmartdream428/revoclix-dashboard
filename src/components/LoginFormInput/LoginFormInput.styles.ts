import styled from "styled-components";

export const LoginFormInputWrapper = styled.div`
  width: 100%;
`;

export const InputLabel = styled.p`
  text-transform: uppercase;
  font-size: 10px;
  color: #6c6c6c;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: left;
  margin: 0;
`;

export const LoginInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 2px solid #0db8de;
  font-weight: bold;
  color: #ecf0f5;
  padding: 10px 0;
  :focus {
    outline: none;
  }
`;
