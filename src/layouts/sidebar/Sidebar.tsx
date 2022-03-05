import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { RiDashboardFill, RiUser2Fill, RiMessage2Fill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { AiOutlineTransaction, AiTwotoneSetting } from "react-icons/ai";

import { SidebarWrapper } from "./Sidebar.styles";
import SidebarContext from "context/SidebarContext";

const Sidebar: React.FC = () => {
  const history = useHistory();
  const { sidebar, setSidebar } = useContext<any>(SidebarContext);

  const handleMenuClick = (key: string, value: string) => {
    setSidebar({ key, value });
    history.push(`/${key}`);
  };

  return (
    <SidebarWrapper>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem
            active={sidebar.key === "home"}
            onClick={() => handleMenuClick("home", "Dashboard")}
            icon={<RiDashboardFill />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            active={sidebar.key === "categories"}
            onClick={() => handleMenuClick("categories", "Categories")}
            icon={<MdCategory />}
          >
            Categories
          </MenuItem>
          <MenuItem
            active={sidebar.key === "customer"}
            onClick={() => handleMenuClick("customer", "Customer")}
            icon={<RiUser2Fill />}
          >
            Customer
          </MenuItem>
          <MenuItem
            active={sidebar.key === "messages"}
            onClick={() => handleMenuClick("messages", "Messages")}
            icon={<RiMessage2Fill />}
          >
            Messages
          </MenuItem>
          <MenuItem
            active={sidebar.key === "transaction"}
            onClick={() => handleMenuClick("transaction", "Transaction")}
            icon={<AiOutlineTransaction />}
          >
            Transaction
          </MenuItem>
          <MenuItem
            active={sidebar.key === "settings"}
            onClick={() => handleMenuClick("settings", "Settings")}
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
