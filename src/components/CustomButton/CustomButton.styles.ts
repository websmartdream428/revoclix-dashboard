import styled from "styled-components";
import { CustomButtonProps } from "types/CustomButtonProps";

const ThemeColor: any = {
  bg: {
    primary: "#1e88e5",
    warning: "#ffb22b",
    danger: "#fc4b6c",
    pink: "#6352ce",
    success: "#47cfe0",
  },
};

export const ButtonWrapper = styled.div<CustomButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ bgColor }) => (bgColor ? ThemeColor.bg[bgColor] : "")};
`;
