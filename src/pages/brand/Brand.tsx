import React from "react";
import { SiBrandfolder } from "react-icons/si";

import { PageCard, PageTitle } from "components";

const BrandPage: React.FC = () => {
  return (
    <PageCard>
      <PageTitle>
        <SiBrandfolder />
        Brand
      </PageTitle>
    </PageCard>
  );
};

export default BrandPage;
