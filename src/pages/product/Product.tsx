import React from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { PageCard, PageTitle } from "components";

const ProductPage: React.FC = () => {
  return (
    <PageCard>
      <PageTitle>
        <MdProductionQuantityLimits />
        Product
      </PageTitle>
    </PageCard>
  );
};

export default ProductPage;
