import React, { useContext } from "react";
import SidebarContext from "context/SidebarContext";

import Container from "components/Container/Container";
import { BreadcrumbWrapper } from "./AppBreadcrumb.styles";

const AppBreadcrumb: React.FC = () => {
  const { sidebar } = useContext<any>(SidebarContext);
  return (
    <BreadcrumbWrapper>
      <Container>
        <span>Home</span> {">"} {sidebar.value}
      </Container>
    </BreadcrumbWrapper>
  );
};

export default AppBreadcrumb;
