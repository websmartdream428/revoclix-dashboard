import React from "react";
import { FormDescWrapper } from "./FormDesc.styles";

const FormDesc: React.FC<any> = ({ children, style }) => {
  return <FormDescWrapper style={style}>{children}</FormDescWrapper>;
};

export default FormDesc;
