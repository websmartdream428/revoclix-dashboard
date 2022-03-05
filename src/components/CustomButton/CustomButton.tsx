import React from "react";
import { CustomButtonProps } from "types/CustomButtonProps";
import { ButtonWrapper } from "./CustomButton.styles";

const CustomButton: React.FC<CustomButtonProps> = ({
  bgColor,
  onClick,
  label,
  fColor,
  radius,
}) => {
  return (
    <ButtonWrapper bgColor={bgColor}>CustomButton: React.FC</ButtonWrapper>
  );
};

export default CustomButton;
