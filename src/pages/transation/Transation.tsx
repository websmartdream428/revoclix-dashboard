import React from "react";
import { AiOutlineTransaction } from "react-icons/ai";

import { PageCard, PageTitle } from "components";

const TransactionPage: React.FC = () => {
  return (
    <PageCard>
      <PageTitle>
        <AiOutlineTransaction />
        Transaction
      </PageTitle>
    </PageCard>
  );
};

export default TransactionPage;
