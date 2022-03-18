import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { LoginFormButton, LoginFormInput } from "components";

import { loginStateProps } from "types/loginStateProps";

import {
  FormWrapper,
  LoginForm,
  LoginLogoWrapper,
  LoginPageWrapper,
  LoginText,
} from "./Login.styles";
import { adminLogin } from "actions/auth.action";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.jwtToken) {
      history.push("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
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
      setLoading(true);
      const res = await adminLogin({
        email: formState.username,
        password: formState.password,
      });
      setLoading(false);
      if (res.type === "success") {
        history.push("/home");
      } else {
        toast.error(res.message, { theme: "colored", autoClose: 3000 });
      }
      // history.push("/home");
    }
  };

  return (
    <LoginPageWrapper>
      <ToastContainer />
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
          <LoginFormButton onClick={handleClick} loading={loading} />
        </FormWrapper>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
