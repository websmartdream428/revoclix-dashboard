import React from "react";

import { LoginButtonProps } from "types/loginFormButtonProps";

import { LoginFormButtonWrapper } from "./LoginFormButton.styles";

const LoginFormButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <LoginFormButtonWrapper onClick={onClick}>Login</LoginFormButtonWrapper>
  );
};

export default LoginFormButton;
