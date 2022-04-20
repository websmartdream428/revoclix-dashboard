import React, { useContext, useEffect, useState } from "react";
import { PageCard, PageTitle, SearchBox } from "components";
import { ImSpellCheck } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { TableAction } from "../categories/Categories.styles";
import ConditionModal from "components/modals/Condition/ConditionModal";
import { ConditionContext } from "context";
import { removeCondition } from "actions/condition.action";
import { toast, ToastContainer } from "react-toastify";

const ConditionPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  const [tabledata, setTabledata] = useState<any>([]);
  const { condition, setCondition } = useContext<any>(ConditionContext);

  useEffect(() => {
    setLoading(true);
    var lookup: any = {};
    var items = condition;
    var conditionTemp = [];

    for (var item, i = 0; (item = items[i++]); ) {
      var name = item.id;

      if (!(name in lookup)) {
        lookup[name] = 1;
        conditionTemp.push(item);
      }
    }
    const tempData = conditionTemp.map((item: any, key: any) => ({
      ...item,
      key: key + 1,
      langData: condition.filter(
        (item1: any) => item1.id_product_status === item.id
      ),
    }));
    setTabledata(tempData);
    setLoading(false);
  }, [condition]);

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

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleAddClick = () => {
    setModalData({});
    setModal(true);
  };

  const handleRowView = (row: any) => {
    setModal(true);
    setModalData(row);
  };

  const handleModalOk = () => {
    setModal(false);
    setModalData({});
  };

  const handleModalCancel = () => {
    setModal(false);
    setModalData({});
  };

  const handleDelete = async (row: any) => {
    setLoading(true);
    const res = await removeCondition(row.id);
    if (res.type === "success") {
      setCondition(condition.filter((item: any) => item.id !== row.id));
    } else {
      toast.error(res.message, {
        theme: "colored",
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  const ConditionColumn: any = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      width: 50,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 350,
      ...getColumnSearchProps("name"),
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Order",
      dataIndex: "_order",
      key: "_order",
      width: 100,
      ...getColumnSearchProps("_order"),
      sorter: (a: any, b: any) => a._order - b._order,
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
      <ToastContainer />
      <PageTitle>
        <ImSpellCheck />
        Condition
      </PageTitle>
      <div>
        <SearchBox onClick={handleAddClick} />
        <Table
          dataSource={tabledata}
          columns={ConditionColumn}
          bordered
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          scroll={{ x: 1000 }}
          loading={loading}
        />
      </div>
      <ConditionModal
        visible={modal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        data={modalData}
      />
    </PageCard>
  );
};

export default ConditionPage;
