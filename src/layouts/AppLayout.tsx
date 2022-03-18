import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

import { AppBreadCrumb, Container, PageContainer } from "components";
import { AppContent, AppWrapper } from "./App.styles";
import { getAllLanguage } from "actions/language.action";
import { getAllBrand } from "actions/brand.action";
import { getAllCategory } from "actions/category.action";
import { BrandContext, CategoryContext, LanguageContext } from "context";

const AppLayout: React.FC = ({ children }) => {
  const location = useLocation();
  const [appFlag, setAppFlag] = useState(false);
  const [menuFlag, setMenuFlag] = useState(false);
  const { setLanguage } = useContext<any>(LanguageContext);
  const { setBrand } = useContext<any>(BrandContext);
  const { setCategory } = useContext<any>(CategoryContext);

  useEffect(() => {
    const getFetchAllData = async () => {
      const langData = await getAllLanguage();
      const brandData = await getAllBrand();
      const categoryData = await getAllCategory();
      setLanguage(langData.data);
      setBrand(brandData.data);
      setCategory(categoryData.data);
    };
    getFetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Container>
          <PageContainer>{children}</PageContainer>
        </Container>
      </AppContent>
    </AppWrapper>
  ) : (
    <> {children}</>
  );
};

export default AppLayout;
