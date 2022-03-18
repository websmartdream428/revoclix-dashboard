import React, { useContext, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";

import { Button, Input, Popconfirm, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

import { LanguageContext } from "context";
import { SearchBox } from "components";
import { LanguageModal } from "components/modals";

import { removeLanguage } from "actions/language.action";

import { TableAction } from "pages/categories/Categories.styles";
import { TableWrapper } from "./Settings.styles";

const LanguageSetting: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState<any>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  const { language, setLanguage } = useContext<any>(LanguageContext);
  const [tabledata, setTabledata] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const tempData = language.map((item: any, key: any) => ({
      key: key + 1,
      id: item.id,
      flag: item.flag,
      flag_view: (
        <img
          src={item.flag}
          width="75px"
          height="45px"
          style={{ objectFit: "cover" }}
          alt={item.iso_code}
        />
      ),
      name: item.name,
      iso_code: item.iso_code,
      code: item.code,
      date_format: item.date_format,
      date_format_full: item.date_format_full,
      active: Number(item.active),
      active_view:
        Number(item.active) === 1 ? (
          <FcCheckmark />
        ) : (
          <IoMdClose fill="#ff0000" />
        ),
    }));
    setTabledata(tempData);
    setLoading(false);
  }, [language]);

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

  const handleDelete = async (row: any) => {
    setLoading(true);
    const res = await removeLanguage(row.id);
    if (res.type === "success") {
      setLanguage(language.filter((item: any) => item.id !== row.id));
    } else {
      toast.error("you can upload only Image file.", {
        theme: "colored",
        autoClose: 3000,
      });
    }
    setLoading(false);
    // setLanguage()
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

  const LanguageColumn: any = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      width: 40,
    },
    {
      title: "Flag",
      dataIndex: "flag_view",
      key: "flag_view",
      width: 70,
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
      dataIndex: "iso_code",
      key: "iso_code",
      width: 90,
      sorter: (a: any, b: any) => a.iso_code - b.iso_code,
      ...getColumnSearchProps("iso_code"),
    },
    {
      title: "Language code",
      dataIndex: "code",
      key: "code",
      width: 90,
      ...getColumnSearchProps("code"),
    },
    {
      title: "Date Format",
      dataIndex: "date_format",
      key: "date_format",
      width: 100,
      ...getColumnSearchProps("date_format"),
    },
    {
      title: "Date Format(full)",
      dataIndex: "date_format_full",
      key: "date_format_full",
      width: 100,
      ...getColumnSearchProps("date_format_full"),
    },
    {
      title: "Enabled",
      dataIndex: "active_view",
      key: "active_view",
      width: 60,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 50,
      render: (row: any) => (
        <TableAction>
          <FaEdit onClick={() => handleRowView(row)} /> <span>|</span>{" "}
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => handleDelete(row)}
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
      <ToastContainer />
      <SearchBox onClick={handleAddClick} />
      <Table
        dataSource={tabledata}
        columns={LanguageColumn}
        loading={loading}
        bordered
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        scroll={{ x: 1300 }}
      />
      <LanguageModal
        visible={modal}
        data={modalData}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
    </TableWrapper>
  );
};

export default LanguageSetting;
