import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { LoginFormButton, LoginFormInput } from "components";

import { loginStateProps } from "types/loginStateProps";

import {
  FormWrapper,
  LoginForm,
  LoginLogoWrapper,
  LoginPageWrapper,
  LoginText,
} from "./Login.styles";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [formState, setFormState] = useState<loginStateProps>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<loginStateProps>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (formState.username === "") {
      setError((prev) => ({ ...prev, username: "Username is required." }));
    } else {
      setError((prev) => ({ ...prev, username: "" }));
    }
    if (formState.password === "") {
      setError((prev) => ({ ...prev, password: "Password is required." }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }
    if (formState.username !== "" && formState.password !== "") {
      history.push("/home");
    }
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
            error={error.username}
            value={formState.username}
            onChange={handleInputChange}
            name="username"
          />
          <LoginFormInput
            type="password"
            label="Password"
            error={error.password}
            value={formState.password}
            onChange={handleInputChange}
            name="password"
          />
          <LoginFormButton onClick={handleClick} />
        </FormWrapper>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
