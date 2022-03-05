import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { RiDashboardFill, RiUser2Fill, RiMessage2Fill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { AiOutlineTransaction, AiTwotoneSetting } from "react-icons/ai";

import { SidebarWrapper } from "./Sidebar.styles";

const Sidebar: React.FC = () => {
  const history = useHistory();
  const [pathname, setPathname] = useState("home");

  const handleMenuClick = (key: string) => {
    setPathname(key);
    history.push(`/${key}`);
  };

  return (
    <SidebarWrapper>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem
            active={pathname === "home"}
            onClick={() => handleMenuClick("home")}
            icon={<RiDashboardFill />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            active={pathname === "categories"}
            onClick={() => handleMenuClick("categories")}
            icon={<MdCategory />}
          >
            Categories
          </MenuItem>
          <MenuItem
            active={pathname === "customer"}
            onClick={() => handleMenuClick("customer")}
            icon={<RiUser2Fill />}
          >
            Customer
          </MenuItem>
          <MenuItem
            active={pathname === "messages"}
            onClick={() => handleMenuClick("messages")}
            icon={<RiMessage2Fill />}
          >
            Messages
          </MenuItem>
          <MenuItem
            active={pathname === "transaction"}
            onClick={() => handleMenuClick("transaction")}
            icon={<AiOutlineTransaction />}
          >
            Transaction
          </MenuItem>
          <MenuItem
            active={pathname === "settings"}
            onClick={() => handleMenuClick("settings")}
            icon={<AiTwotoneSetting />}
          >
            Settings
          </MenuItem>
          {/* <SubMenu title="Components" icon={<FaHeart />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu> */}
        </Menu>
      </ProSidebar>
      ;
    </SidebarWrapper>
  );
};

export default Sidebar;
