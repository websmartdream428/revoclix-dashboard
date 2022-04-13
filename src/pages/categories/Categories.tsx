import React, { useContext, useEffect, useState } from "react";
import { MdCategory, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Highlighter from "react-highlight-words";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { PageCard, PageTitle, SearchBox } from "components";
import { CategoriesTableWrapper, TableAction } from "./Categories.styles";
import { CategoriesModal } from "components/modals";
import { FcCheckmark } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { removeCategory } from "actions/category.action";
import { CategoryContext } from "context";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const CategoriesPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState<any>(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { category, setCategory } = useContext<any>(CategoryContext);
  const [tabledata, setTabledata] = useState<any>([]);
  const [modalData, setModalData] = useState<any>({});
  useEffect(() => {
    setLoading(true);
    var lookup: any = {};
    var items = category;
    var categoryTemp = [];

    for (var item, i = 0; (item = items[i++]); ) {
      var name = item.id;

      if (!(name in lookup)) {
        lookup[name] = 1;
        categoryTemp.push(item);
      }
    }
    const tempData = categoryTemp.map((item: any, key: any) => ({
      ...item,
      key: key + 1,
      icon: item.icon,
      langData: category.filter((item1: any) => item1.id_category === item.id),
      icon_view: <Icon icon={`mdi:${item.icon}`} fontSize="30px" />,
      // (
      //   <img
      //     src={item.icon}
      //     width="75px"
      //     height="75px"
      //     style={{ objectFit: "cover" }}
      //     alt={item.icon}
      //   />
      // ),
      // description_view: (
      //   <div
      //     dangerouslySetInnerHTML={{
      //       __html: item.description,
      //     }}
      //   />
      // ),
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
  }, [category]);

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

  const handleDelete = async (row: any) => {
    setLoading(true);
    const res = await removeCategory(row.id);
    if (res.type === "success") {
      setCategory(category.filter((item: any) => item.id !== row.id));
    } else {
      toast.error(res.message, {
        theme: "colored",
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  const handleModalOk = () => {
    setModal(false);
    setModalData({});
  };

  const handleModalCancel = () => {
    setModal(false);
    setModalData({});
  };

  const handleRowView = (row: any) => {
    setModal(true);
    setModalData(row);
  };

  const handleAddClick = () => {
    setModalData({});
    setModal(true);
  };

  const CategoriesColumn: any = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "Icon",
      dataIndex: "icon_view",
      key: "icon_view",
      width: 100,
      ...getColumnSearchProps("icon_view"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 350,
      ...getColumnSearchProps("name"),
    },
    // {
    //   title: "Description",
    //   dataIndex: "description_view",
    //   key: "description_view",
    //   width: 530,
    //   sorter: (a: any, b: any) =>
    //     a.description_view.localeCompare(b.description_view),
    //   ...getColumnSearchProps("description_view"),
    // },
    {
      title: "Displayed",
      dataIndex: "active_view",
      key: "active_view",
      width: 100,
      ...getColumnSearchProps("active_view"),
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
    <PageCard>
      <PageTitle>
        <MdCategory />
        Categories
      </PageTitle>
      <CategoriesTableWrapper>
        <SearchBox onClick={handleAddClick} />
        <Table
          dataSource={tabledata}
          columns={CategoriesColumn}
          bordered
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          scroll={{ x: 1000 }}
          loading={loading}
        />
      </CategoriesTableWrapper>
      <CategoriesModal
        visible={modal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        data={modalData}
      />
    </PageCard>
  );
};

export default CategoriesPage;
