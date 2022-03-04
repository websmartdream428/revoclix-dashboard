import styled from "styled-components";

export const LoginPageWrapper = styled.div`
  background-color: #222d32;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.div`
  position: relative;
  max-width: 500px;
  width: 87%;
  padding: 50px 5%;
  background-color: #1a2226;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  text-align: center;
  color: white;
`;

export const LoginLogoWrapper = styled.div`
  width: 70px;
  height: 70px;
  margin: auto;

  svg {
    width: 100%;
    fill: #27ef9f;
    height: 100%;
  }
`;

export const LoginText = styled.h1`
  text-transform: uppercase;
  margin-top: 15px;
  margin-bottom: 50px;
  text-align: center;
  font-size: 30px;
  letter-spacing: 2px;
  margin-top: 15px;
  font-weight: bold;
  color: #ecf0f5;
`;

export const FormWrapper = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 30px;
  }
`;
