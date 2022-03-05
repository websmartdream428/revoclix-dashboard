import styled from "styled-components";
import { CustomButtonProps } from "types/CustomButtonProps";

const Theme: any = {
  bg: {
    primary: "#1e88e5",
    warning: "#ffb22b",
    danger: "#fc4b6c",
    pink: "#6352ce",
    success: "#47cfe0",
  },
  radius: {
    full: "9999px",
  },
};

export const ButtonWrapper = styled.div<CustomButtonProps>`
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  font-size: 16px;
  line-height: 16px;
  border-radius: ${({ radius }) =>
    radius ? Theme.radius[radius] : Theme.radius.full};
  color: #fff;
  background-color: ${({ bgColor }) =>
    bgColor ? Theme.bg[bgColor] : Theme.bg.primary};
`;
