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
    <ButtonWrapper
      onClick={onClick}
      bgColor={bgColor}
      fColor={fColor}
      radius={radius}
    >
      {label}
    </ButtonWrapper>
  );
};

export default CustomButton;
