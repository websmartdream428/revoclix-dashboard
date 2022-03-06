import { PageCard } from "components";
import PageTitle from "components/PageTitle/PageTitle";
import React from "react";
import { CategoriesPageWrapper } from "./Categories.styles";

const CategoriesPage: React.FC = () => {
  return (
    <PageCard>
      <CategoriesPageWrapper>
        <PageTitle>Categories</PageTitle>
      </CategoriesPageWrapper>
    </PageCard>
  );
};

export default CategoriesPage;
