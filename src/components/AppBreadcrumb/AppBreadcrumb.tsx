import SidebarContext from "context/SidebarContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BreadcrumbWrapper } from "./AppBreadcrumb.styles";

const AppBreadcrumb: React.FC = () => {
  const { sidebar } = useContext<any>(SidebarContext);
  return (
    <BreadcrumbWrapper>
      <Link to="/home">Home</Link> {">"} <span>{sidebar.value}</span>
    </BreadcrumbWrapper>
  );
};

export default AppBreadcrumb;
