import React from "react";

import Sidebar from "./sidebar/Sidebar";

import { AppContent, AppWrapper } from "./App.styles";

const AppLayout: React.FC = ({ children }) => {
  return (
    <AppWrapper>
      <Sidebar />
      <AppContent>{children}</AppContent>
    </AppWrapper>
  );
};

export default AppLayout;
