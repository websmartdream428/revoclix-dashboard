import React, { useContext, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { SiBrandfolder } from "react-icons/si";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { PageCard, PageTitle, SearchBox } from "components";

import { BrandTableWrapper } from "./Brand.styles";
import { TableAction } from "pages/categories/Categories.styles";
import BrandModal from "components/modals/Brand/BrandModal";
import { BrandContext } from "context";
import { FcCheckmark } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { removeBrand } from "actions/brand.action";
import { toast, ToastContainer } from "react-toastify";

const BrandPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState<any>(null);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  const { brand, setBrand } = useContext<any>(BrandContext);
  const [tabledata, setTabledata] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    var lookup: any = {};
    var items = brand;
    var brandTemp = [];

    for (var item, i = 0; (item = items[i++]); ) {
      var name = item.id;

      if (!(name in lookup)) {
        lookup[name] = 1;
        brandTemp.push(item);
      }
    }
    const tempData = brandTemp.map((item: any, key: any) => ({
      ...item,
      key: key + 1,
      logo_view: (
        <img
          src={item.logo}
          width="75px"
          height="45px"
          style={{ objectFit: "cover" }}
          alt={item.logo}
        />
      ),
      descriptions: brand.filter((item1: any) => item1.id_brands === item.id),
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
  }, [brand]);

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
    const res = await removeBrand(row.id);
    if (res.type === "success") {
      setBrand(brand.filter((item: any) => item.id !== row.id));
    } else {
      toast.error(res.message, {
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

  const handleRowView = (row: any) => {
    setModal(true);
    setModalData(row);
  };

  const handleAddClick = () => {
    setModalData({});
    setModal(true);
  };

  const BrandColumn: any = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      width: 40,
    },
    {
      title: "Logo",
      dataIndex: "logo_view",
      key: "logo_view",
      width: 70,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Meta title",
      dataIndex: "meta_title",
      key: "meta_title",
      width: 250,
      sorter: (a: any, b: any) => a.meta_title.localeCompare(b.meta_title),
      ...getColumnSearchProps("meta_title"),
    },
    {
      title: "Enabled",
      dataIndex: "active_view",
      key: "active_view",
      width: 100,
      ...getColumnSearchProps("active_view"),
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
    <PageCard>
      <ToastContainer />
      <PageTitle>
        <SiBrandfolder />
        Brand
      </PageTitle>
      <BrandTableWrapper>
        <SearchBox onClick={handleAddClick} />
        <Table
          dataSource={tabledata}
          columns={BrandColumn}
          bordered
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          scroll={{ x: 1000 }}
        />
      </BrandTableWrapper>
      <BrandModal
        visible={modal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        data={modalData}
      />
    </PageCard>
  );
};

export default BrandPage;
