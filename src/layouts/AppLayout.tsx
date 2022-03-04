import React from "react";

import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

import { AppBreadCrumb } from "components";
import { AppContent, AppWrapper } from "./App.styles";

const AppLayout: React.FC = ({ children }) => {
  return (
    <AppWrapper>
      <Sidebar />
      <Navbar />
      <AppContent>
        <AppBreadCrumb />
        {children}
      </AppContent>
    </AppWrapper>
  );
};

export default AppLayout;
