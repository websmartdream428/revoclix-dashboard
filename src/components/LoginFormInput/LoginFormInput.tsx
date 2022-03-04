import React from "react";
import { LoginFormProps } from "types/loginFormProps";

import {
  ErrorLabel,
  InputLabel,
  LoginFormInputWrapper,
  LoginInput,
} from "./LoginFormInput.styles";

const LoginFormInput: React.FC<LoginFormProps> = ({
  type,
  label,
  name,
  error,
  value,
  onChange,
}) => {
  return (
    <LoginFormInputWrapper>
      <InputLabel>{label}</InputLabel>
      <LoginInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
      />
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </LoginFormInputWrapper>
  );
};

export default LoginFormInput;
