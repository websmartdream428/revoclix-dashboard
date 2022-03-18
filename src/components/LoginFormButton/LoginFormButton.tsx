import React from "react";

import { LoginButtonProps } from "types/loginFormButtonProps";

import { LoginFormButtonWrapper } from "./LoginFormButton.styles";

const LoginFormButton: React.FC<LoginButtonProps> = ({ onClick, loading }) => {
  return (
    <LoginFormButtonWrapper onClick={loading ? () => {} : onClick}>
      {loading ? "Loading..." : "Login"}
    </LoginFormButtonWrapper>
  );
};

export default LoginFormButton;
