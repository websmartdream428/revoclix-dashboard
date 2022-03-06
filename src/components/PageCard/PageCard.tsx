import React from "react";

import { PageCardWrapper } from "./PageCard.styles";

const PageCard: React.FC = ({ children }) => {
  return <PageCardWrapper>{children}</PageCardWrapper>;
};

export default PageCard;
