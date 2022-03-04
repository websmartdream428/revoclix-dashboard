import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaGem, FaHeart } from "react-icons/fa";

import { SidebarWrapper } from "./Sidebar.styles";

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
          <SubMenu title="Components" icon={<FaHeart />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
      ;
    </SidebarWrapper>
  );
};

export default Sidebar;
