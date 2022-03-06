import { PageCard, PageTitle } from "components";
import React from "react";
import { AiTwotoneSetting } from "react-icons/ai";

const SettingsPage: React.FC = () => {
  return (
    <PageCard>
      <PageTitle>
        <AiTwotoneSetting />
        Settings
      </PageTitle>
    </PageCard>
  );
};

export default SettingsPage;
