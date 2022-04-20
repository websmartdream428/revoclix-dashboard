import React, { useContext, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TableAction } from "pages/categories/Categories.styles";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TableWrapper } from "./Settings.styles";
import { SearchBox } from "components";
import { TranslateModal } from "components/modals";
import { LanguageContext, TranslateContext } from "context";
import { removeTranslate } from "actions/translate.action";
import { toast, ToastContainer } from "react-toastify";

const TranslateSetting: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState<any>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  const { translate, setTranslate } = useContext<any>(TranslateContext);
  const { language } = useContext<any>(LanguageContext);
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    var lookup: any = {};
    var items = translate;
    var translateTemp = [];

    for (var item, i = 0; (item = items[i++]); ) {
      var name = item.id;

      if (!(name in lookup)) {
        lookup[name] = 1;
        translateTemp.push(item);
      }
    }
    const tableData = translateTemp.map((item: any, key: any) => ({
      key: key + 1,
      id: item.id,
      _key: item._key,
      id_lang: item.id_lang,
      lang: language.filter((item1: any) => item1.id === item.id_lang)[0].name,
      value: item.name,
    }));
    setTableData(tableData);

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translate]);

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

  const handleDelete = async (e: any, row: any) => {
    setLoading(true);
    const res = await removeTranslate(row.id);
    if (res.type === "success") {
      setTranslate(translate.filter((item: any) => item.id !== row.id));
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

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleRowView = (row: any) => {
    setModal(true);
    let langData: any = [];
    let data: any = { _key: row._key };

    const filteredData: any = translate.filter(
      (item: any) => item.id === row.id
    );
    filteredData.forEach((item: any) => {
      let temp: any = {};
      temp.lang = item.id_lang;
      temp.text = item.name;
      langData.push(temp);
      data[item.id_lang] = item.name;
    });
    data.langData = langData;
    setModalData({ ...data, id: row.id });
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
      title: "Key",
      dataIndex: "_key",
      key: "_key",
      width: 500,
      sorter: (a: any, b: any) => a._key.localeCompare(b._key),

      ...getColumnSearchProps("_key"),
    },
    // {
    //   title: "Language",
    //   dataIndex: "lang",
    //   key: "lang",
    //   width: 110,
    //   sorter: (a: any, b: any) => a.lang.localeCompare(b.lang),
    //   ...getColumnSearchProps("lang"),
    // },
    // {
    //   title: "Value",
    //   dataIndex: "value",
    //   key: "value",
    //   width: 90,
    //   sorter: (a: any, b: any) => a.iso - b.iso,
    //   ...getColumnSearchProps("iso"),
    // },
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
            onConfirm={(e) => handleDelete(e, row)}
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
        loading={loading}
        dataSource={tableData}
        columns={TranslateColumn}
        bordered
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        // scroll={{ x: 1300 }}
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
