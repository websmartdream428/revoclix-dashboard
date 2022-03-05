import React from "react";

export interface CustomButtonProps {
  label?: string | undefined;
  fColor?: string | undefined;
  bgColor?: string | undefined;
  radius?: string | number | undefined;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}
