import React from "react";
import { LoginFormProps } from "types/loginFormProps";

import {
  InputLabel,
  LoginFormInputWrapper,
  LoginInput,
} from "./LoginFormInput.styles";

const LoginFormInput: React.FC<LoginFormProps> = ({
  type,
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <LoginFormInputWrapper>
      <InputLabel>{label}</InputLabel>
      <LoginInput type={type} name={name} value={value} onChange={onChange} />
    </LoginFormInputWrapper>
  );
};

export default LoginFormInput;
