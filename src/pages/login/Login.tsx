import React, { useState } from "react";

import { RiAdminFill } from "react-icons/ri";
import { LoginFormInput } from "components";

import { loginStateProps } from "types/loginStateProps";

import {
  FormWrapper,
  LoginForm,
  LoginLogoWrapper,
  LoginPageWrapper,
  LoginText,
} from "./Login.styles";

const LoginPage: React.FC = () => {
  const [formState, setFormState] = useState<loginStateProps>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    console.log(e.target.name);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <LoginPageWrapper>
      <LoginForm>
        <LoginLogoWrapper>
          <RiAdminFill />
        </LoginLogoWrapper>
        <LoginText>Admin Panel</LoginText>
        <FormWrapper>
          <LoginFormInput
            type="text"
            label="Username"
            value={formState.username}
            onChange={handleInputChange}
            name="username"
          />
          <LoginFormInput
            type="password"
            label="Password"
            value={formState.password}
            onChange={handleInputChange}
            name="password"
          />
        </FormWrapper>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
