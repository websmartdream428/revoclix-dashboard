import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TableAction } from "pages/categories/Categories.styles";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TableWrapper } from "./Settings.styles";
import { SearchBox } from "components";
import { TranslateDataSource } from "mockups/TableDataSource";
import { TranslateModal } from "components/modals";

const TranslateSetting: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState<any>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>({});

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

  const handleDelete = (e: any, row: any) => {
    console.log(e);
    console.log(row);
  };

  const handleModalOk = () => {
    setModal(false);
  };

  const handleModalCancel = () => {
    setModal(false);
  };

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleRowView = (row: any) => {
    setModal(true);
    setModalData(row);
  };

  const handleAddClick = () => {
    setModal(true);
  };

  const TranslateColumn: any = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      width: 40,
    },
    {
      title: "Flag",
      dataIndex: "flag",
      key: "flag",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 110,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "ISO code",
      dataIndex: "iso",
      key: "iso",
      width: 90,
      sorter: (a: any, b: any) => a.iso - b.iso,
      ...getColumnSearchProps("iso"),
    },
    {
      title: "Language code",
      dataIndex: "language",
      key: "language",
      width: 90,
      ...getColumnSearchProps("language"),
    },
    {
      title: "Date Format",
      dataIndex: "dateFormat",
      key: "dateFormat",
      width: 100,
      ...getColumnSearchProps("dateFormat"),
    },
    {
      title: "Date Format(full)",
      dataIndex: "dateFormatFull",
      key: "dateFormatFull",
      width: 100,
      ...getColumnSearchProps("dateFormatFull"),
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      width: 60,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 70,
      render: (row: any) => (
        <TableAction>
          <FaEdit onClick={() => handleRowView(row)} /> <span>|</span>{" "}
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={(e) => handleDelete(e, row.key)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <MdDelete />
          </Popconfirm>
        </TableAction>
      ),
    },
  ];

  return (
    <TableWrapper>
      <SearchBox onClick={handleAddClick} />
      <Table
        dataSource={TranslateDataSource}
        columns={TranslateColumn}
        bordered
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        scroll={{ x: 1300 }}
      />
      <TranslateModal
        visible={modal}
        data={modalData}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
    </TableWrapper>
  );
};

export default TranslateSetting;
