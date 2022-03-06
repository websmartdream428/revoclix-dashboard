import React from "react";
import { RiMessage2Fill } from "react-icons/ri";

import { PageCard, PageTitle } from "components";

const MessagesPage: React.FC = () => {
  return (
    <PageCard>
      <PageTitle>
        <RiMessage2Fill />
        Messages
      </PageTitle>
    </PageCard>
  );
};

export default MessagesPage;
