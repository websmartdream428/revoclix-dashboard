import React from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { Tabs } from "antd";
import {
  GlobalOutlined,
  TranslationOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import { PageCard, PageTitle } from "components";
import { SettingTabWrapper } from "./Settings.styles";
import LanguageSetting from "./LanguageSetting";
import TranslateSetting from "./TranslateSetting";
import CurrencySetting from "./CurrencySetting";

const SettingsPage: React.FC = () => {
  const { TabPane } = Tabs;
  return (
    <PageCard>
      <PageTitle>
        <AiTwotoneSetting />
        Settings
      </PageTitle>
      <SettingTabWrapper>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <GlobalOutlined />
                Language
              </span>
            }
            key="1"
          >
            <LanguageSetting />
          </TabPane>
          <TabPane
            tab={
              <span>
                <TranslationOutlined />
                Translate
              </span>
            }
            key="2"
          >
            <TranslateSetting />
          </TabPane>
          <TabPane
            tab={
              <span>
                <DollarCircleOutlined />
                Currency
              </span>
            }
            key="3"
          >
            <CurrencySetting />
          </TabPane>
        </Tabs>
      </SettingTabWrapper>
    </PageCard>
  );
};

export default SettingsPage;
