import React from "react";
import { Button, Input } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { SearchBoxWrapper } from "./SearchBox.styles";

const SearchBox: React.FC = () => {
  return (
    <SearchBoxWrapper>
      <Input
        size="large"
        placeholder="Search all data"
        suffix={<SearchOutlined />}
      />
      <Button type="primary" icon={<PlusOutlined />} size="large">
        New
      </Button>
    </SearchBoxWrapper>
  );
};

export default SearchBox;
