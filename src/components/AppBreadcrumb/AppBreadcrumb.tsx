import React from "react";
import { Link } from "react-router-dom";

import { BreadcrumbWrapper } from "./AppBreadcrumb.styles";

const AppBreadcrumb: React.FC = () => {
  return (
    <BreadcrumbWrapper>
      <Link to="/home">Home</Link> {">"} <span>Dashboard</span>
    </BreadcrumbWrapper>
  );
};

export default AppBreadcrumb;
