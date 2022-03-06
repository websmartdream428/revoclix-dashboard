import React from "react";

import { AppLogo, MenuToggleButton, UserLogo } from "components";

import { NavbarSection, NavbarWrapper } from "./Navbar.styles";
import { MenuToggleProps } from "types/MenuToggleProps";

const Navbar: React.FC<MenuToggleProps> = ({ onClick }) => {
  return (
    <NavbarWrapper>
      <AppLogo />
      <NavbarSection>
        <MenuToggleButton onClick={onClick} />
        <UserLogo />
      </NavbarSection>
    </NavbarWrapper>
  );
};

export default Navbar;
