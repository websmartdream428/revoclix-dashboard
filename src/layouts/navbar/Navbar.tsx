import React from "react";
import { useHistory } from "react-router-dom";

import { AppLogo, MenuToggleButton, UserLogo } from "components";

import { NavbarSection, NavbarWrapper } from "./Navbar.styles";
import { MenuToggleProps } from "types/MenuToggleProps";
import { adminLogout } from "actions/auth.action";

const Navbar: React.FC<MenuToggleProps> = ({ onClick }) => {
  const history = useHistory();
  return (
    <NavbarWrapper>
      <AppLogo />
      <NavbarSection>
        <MenuToggleButton onClick={onClick} />
        <UserLogo
          onClick={() => {
            adminLogout();
            history.push("/");
          }}
        />
      </NavbarSection>
    </NavbarWrapper>
  );
};

export default Navbar;
