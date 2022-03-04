import React from "react";

import { AppLogo, UserLogo } from "components";

import { NavbarSection, NavbarWrapper } from "./Navbar.styles";

const Navbar = () => {
  return (
    <NavbarWrapper>
      <AppLogo />
      <NavbarSection>
        <UserLogo />
      </NavbarSection>
    </NavbarWrapper>
  );
};

export default Navbar;
