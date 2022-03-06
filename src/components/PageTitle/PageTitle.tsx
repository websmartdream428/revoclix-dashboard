import React from "react";

import { PageTitleWrapper } from "./PageTitle.styles";

const PageTitle: React.FC = ({ children }) => {
  return <PageTitleWrapper>{children}</PageTitleWrapper>;
};

export default PageTitle;
