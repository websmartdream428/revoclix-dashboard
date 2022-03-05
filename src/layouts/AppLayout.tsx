import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

import { AppBreadCrumb } from "components";
import { AppContent, AppWrapper } from "./App.styles";

const AppLayout: React.FC = ({ children }) => {
  const location = useLocation();
  const [appFlag, setAppFlag] = useState(false);

  useEffect(() => {
    setAppFlag(location.pathname !== "/");
  }, [location]);
  return appFlag ? (
    <AppWrapper>
      <Sidebar />
      <Navbar />
      <AppContent>
        <AppBreadCrumb />
        {children}
      </AppContent>
    </AppWrapper>
  ) : (
    <> {children}</>
  );
};

export default AppLayout;
