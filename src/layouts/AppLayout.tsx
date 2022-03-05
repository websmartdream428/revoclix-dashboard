import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

import { AppBreadCrumb, Container } from "components";
import { AppContent, AppWrapper } from "./App.styles";

const AppLayout: React.FC = ({ children }) => {
  const location = useLocation();
  const [appFlag, setAppFlag] = useState(false);
  const [menuFlag, setMenuFlag] = useState(false);

  useEffect(() => {
    setAppFlag(location.pathname !== "/");
  }, [location]);

  const handleMenuClick = () => {
    setMenuFlag((prev) => !prev);
  };

  return appFlag ? (
    <AppWrapper>
      <Sidebar flag={menuFlag} onClick={() => setMenuFlag(false)} />
      <Navbar onClick={handleMenuClick} />
      <AppContent>
        <AppBreadCrumb />
        <Container>{children}</Container>
      </AppContent>
    </AppWrapper>
  ) : (
    <> {children}</>
  );
};

export default AppLayout;
