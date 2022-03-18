import React from "react";
import { FormDescWrapper } from "./FormDesc.styles";

const FormDesc: React.FC = ({ children }) => {
  return <FormDescWrapper>{children}</FormDescWrapper>;
};

export default FormDesc;
