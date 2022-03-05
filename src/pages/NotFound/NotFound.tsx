import React from "react";
import { NotFoundWrapper } from "./NotFound.styles";

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundWrapper>
      <h1>404</h1>
      <h3>PAGE NOT FOUND !</h3>
      <p>YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
    </NotFoundWrapper>
  );
};

export default NotFoundPage;
