import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { RiDashboardFill, RiUser2Fill, RiMessage2Fill } from "react-icons/ri";
import { MdCategory, MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineTransaction, AiTwotoneSetting } from "react-icons/ai";

import { SidebarOverLay, SidebarWrapper } from "./Sidebar.styles";
import SidebarContext from "context/SidebarContext";
import { FlagProps } from "types/FlagProps";

const Sidebar: React.FC<FlagProps> = ({ flag, onClick }) => {
  const history = useHistory();
  const { sidebar, setSidebar } = useContext<any>(SidebarContext);

  const handleMenuClick = (key: string, value: string) => {
    setSidebar({ key, value });
    history.push(`/${key}`);
    onClick && onClick();
  };

  return (
    <>
      <SidebarWrapper flag={flag}>
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
              active={sidebar.key === "product"}
              onClick={() => handleMenuClick("product", "Product")}
              icon={<MdProductionQuantityLimits />}
            >
              Product
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
          </Menu>
        </ProSidebar>
      </SidebarWrapper>
      <SidebarOverLay flag={flag} onClick={onClick} />
    </>
  );
};

export default Sidebar;
