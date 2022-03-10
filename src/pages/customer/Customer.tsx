import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import { RiUser2Fill } from "react-icons/ri";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { PageCard, PageTitle, SearchBox } from "components";
import { CustomerTableWrapper } from "./Customer.styles";
import { TableAction } from "pages/categories/Categories.styles";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CustomerDataSource } from "mockups/TableDataSource";
import CustomerModal from "components/modals/Customer/CustomerModal";

const CustomerPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState<any>(null);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>({});

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

  const handleRowView = (row: any) => {
    setModal(true);
    setModalData(row);
  };

  const handleAddClick = () => {
    setModal(true);
  };

  const CustomerColumn: any = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      width: 120,
      sorter: (a: any, b: any) => a.customer.localeCompare(b.customer),
      ...getColumnSearchProps("customer"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 120,
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
      ...getColumnSearchProps("email"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      sorter: (a: any, b: any) => a.type.localeCompare(b.type),
      ...getColumnSearchProps("type"),
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      width: 150,
      sorter: (a: any, b: any) => a.language.localeCompare(b.language),
      ...getColumnSearchProps("language"),
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      width: 100,
      sorter: (a: any, b: any) => a.employee.localeCompare(b.employee),
      ...getColumnSearchProps("employee"),
    },
    {
      title: "Messages",
      dataIndex: "messages",
      key: "messages",
      width: 150,
      sorter: (a: any, b: any) => a.messages.localeCompare(b.messages),
      ...getColumnSearchProps("messages"),
    },
    {
      title: "Private",
      dataIndex: "private",
      key: "private",
      width: 80,
      sorter: (a: any, b: any) => a.private.localeCompare(b.private),
      ...getColumnSearchProps("private"),
    },
    {
      title: "Last message",
      dataIndex: "lastMessage",
      key: "lastMessage",
      width: 150,
      sorter: (a: any, b: any) => a.lastMessage.localeCompare(b.lastMessage),
      ...getColumnSearchProps("lastMessage"),
    },
    {
      title: "Shop",
      dataIndex: "shop",
      key: "shop",
      width: 100,
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
    <PageCard>
      <PageTitle>
        <RiUser2Fill />
        Customer
      </PageTitle>
      <CustomerTableWrapper>
        <SearchBox onClick={handleAddClick} />
        <Table
          dataSource={CustomerDataSource}
          columns={CustomerColumn}
          bordered
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          scroll={{ x: 1300 }}
        />
      </CustomerTableWrapper>
      <CustomerModal
        visible={modal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        data={modalData}
      />
    </PageCard>
  );
};

export default CustomerPage;
