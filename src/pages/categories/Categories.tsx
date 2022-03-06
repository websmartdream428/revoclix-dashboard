import React from "react";
import { MdCategory } from "react-icons/md";

import { PageCard, PageTitle } from "components";

const CategoriesPage: React.FC = () => {
  return (
    <PageCard>
      <PageTitle>
        <MdCategory />
        Categories
      </PageTitle>
    </PageCard>
  );
};

export default CategoriesPage;
