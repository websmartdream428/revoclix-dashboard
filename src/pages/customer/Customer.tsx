import React from "react";
import { RiUser2Fill } from "react-icons/ri";

import { PageCard, PageTitle } from "components";

const CustomerPage: React.FC = () => {
  return (
    <PageCard>
      <PageTitle>
        <RiUser2Fill />
        Customer
      </PageTitle>
    </PageCard>
  );
};

export default CustomerPage;
