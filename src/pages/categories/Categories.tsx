import React, { useState } from "react";
import { MdCategory, MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { PageCard, PageTitle } from "components";
import { CategoriesDataSource } from "mockups/TableDataSource";
import { TableAction } from "./Categories.styles";

const CategoriesPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState<any>(null);

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            setSearchInput(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const CategoriesColumn = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a: any, b: any) => a.description.localeCompare(b.description),
      ...getColumnSearchProps("description"),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      sorter: (a: any, b: any) => a.position - b.position,
      ...getColumnSearchProps("position"),
    },
    {
      title: "Displayed",
      dataIndex: "displayed",
      key: "displayed",
      ...getColumnSearchProps("displayed"),
    },
    {
      title: "Action",
      key: "action",
      render: (row: any) => (
        <TableAction>
          <FaEye
            onClick={() => {
              console.log(row);
            }}
          />
          <span>|</span> <FaEdit /> <span>|</span> <MdDelete />
        </TableAction>
      ),
    },
  ];

  return (
    <PageCard>
      <PageTitle>
        <MdCategory />
        Categories
      </PageTitle>
      <Table
        dataSource={CategoriesDataSource}
        columns={CategoriesColumn}
        bordered
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
      />
      ;
    </PageCard>
  );
};

export default CategoriesPage;
