import React from "react";
import { ImMenu } from "react-icons/im";
import { MenuToggleProps } from "types/MenuToggleProps";

import { ButtonWrapper } from "./MenuToggleButton.styles";

const MenuToggleButton: React.FC<MenuToggleProps> = ({ onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <ImMenu />
    </ButtonWrapper>
  );
};

export default MenuToggleButton;
