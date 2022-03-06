import React from "react";
import { PageWrapper } from "./PageContainer.styles";

const PageContainer: React.FC = ({ children }) => {
  return <PageWrapper>{children}</PageWrapper>;
};

export default PageContainer;
