import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  BrandContext,
  CategoryContext,
  ConditionContext,
  LanguageContext,
} from "context";

import { ModalProps } from "types/ModalProps";
import FormDesc from "components/FormDesc/FormDesc";

const ProductModal: React.FC<ModalProps> = ({
  visible,
  data,
  onCancel,
  onOk,
}) => {
  const { Option } = Select;
  const { language } = useContext<any>(LanguageContext);
  const { category } = useContext<any>(CategoryContext);
  const { condition } = useContext<any>(ConditionContext);
  const { brand } = useContext<any>(BrandContext);
  const [brandData, setBrandData] = useState<any>([]);
  const [conditionData, setConditionData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [treeData, setTreeData] = useState([]);
  const [characterCounter, setCharacterCounter] = useState({
    desc: 0,
    meta_title: 0,
    meta_desc: 0,
  });
  const [state, setState] = useState({
    id_lang: "",
    name: "",
    description: "",
    meta_title: "",
    meta_descrpition: "",
    id_category: -1,
    id_brand: "",
    id_status: "",
    price: "",
    active: 0,
    ean: "", // Parcel Size
    category: "",
  });

  useEffect(() => {
    const callbackFunc = async () => {
      setBrandData(await distinctFunc(brand));
      setConditionData(await distinctFunc(condition));
    };
    callbackFunc();
    setTreeData(func(0, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, category, condition]);

  const distinctFunc = async (data: any) => {
    let lookup: any = {};
    let items = data;
    if (data[0].active !== undefined) {
      items = data.filter((item: any) => item.active === 1);
    }
    let distinctData = [];

    for (let item, i = 0; (item = items[i++]); ) {
      let name = item.id;

      if (!(name in lookup)) {
        lookup[name] = 1;
        distinctData.push(item);
      }
    }
    return distinctData;
  };

  const func = (pid: number, depth: number) => {
    let lookup: any = {};
    let items = category.filter((item: any) => item.active === 1);
    let categoryTemp = [];

    for (let item, i = 0; (item = items[i++]); ) {
      let name = item.id;

      if (!(name in lookup)) {
        lookup[name] = 1;
        categoryTemp.push(item);
      }
    }
    let temp: any = categoryTemp.filter(
      (item: any) =>
        Number(item.id_parent) === Number(pid) &&
        Number(item.level_depth) === Number(depth)
    );
    let temp1 = temp.map((item: any) => ({
      value: `${item.level_depth}-${item.id_parent}-${item.id}`,
      title: item.name,
      key: `${item.level_depth}-${item.id_parent}-${item.id}`,
      children: func(item.id, Number(item.level_depth) + 1),
    }));
    if (temp1.length > 0) {
      return temp1;
    } else {
      return;
    }
  };

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // const valid = await addValidation(state);
    // if (!valid.valid) {
    //   toast.error(valid.message, { theme: "colored", autoClose: 3000 });
    // } else {
    //   setLoading(true);
    //   if (editId < 0) {
    //     const res = await addCondition(state);
    //     if (res.type === "success") {
    //       setCondition([...condition, res.data]);
    //       await defaultState();
    //       onOk();
    //     } else {
    //       toast.error(res.message, { theme: "colored", autoClose: 3000 });
    //     }
    //   } else {
    //     const res = await editCondition(editId, state);
    //     if (res.type === "success") {
    //       if (
    //         condition.filter(
    //           (item: any) =>
    //             item.id === editId && item.id_lang === state.id_lang
    //         ).length > 0
    //       ) {
    //         let temp = await condition.map((item: any) => {
    //           if (item.id === editId && item.id_lang === state.id_lang) {
    //             return res.data;
    //           }
    //           return item;
    //         });
    //         setCondition(temp);
    //       } else {
    //         setCondition([...condition, res.data]);
    //       }
    //       await defaultState();
    //       onOk();
    //     } else {
    //       toast.error(res.message, { theme: "colored", autoClose: 3000 });
    //     }
    //   }
    //   setLoading(false);
    // }
  };

  const handleCancel = async () => {
    // await defaultState();
    // onCancel();
  };
  return (
    <Modal
      title="Product"
      centered
      visible={visible}
      width={"90%"}
      onCancel={handleCancel}
      onOk={handleSave}
      okButtonProps={{ loading: loading }}
    >
      <Form
        style={{ width: "100%", maxWidth: "800px", margin: "auto" }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item label="* Language">
          <Select
            style={{ width: 150, marginBottom: 5 }}
            value={state.id_lang}
            placeholder="* Select the language"
            onChange={(value) => {
              const temp = data.langData?.filter(
                (item: any) => item.id_lang === value
              )[0];
              setState({
                ...state,
                id_lang: value,
                name: temp?.name ? temp.name : "",
                description: temp?.description ? temp?.description : "",
              });
            }}
          >
            {language
              ?.filter((item: any) => item.active === 1)
              .map((item: any, key: any) => (
                <Option value={item.id} key={key}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="* Name">
          {state.id_lang !== "" && (
            <Input onChange={handleChange} name="name" value={state.name} />
          )}
          <FormDesc>
            {state.id_lang !== ""
              ? `Invalid characters: <>;=#{}`
              : "Select the Language"}
          </FormDesc>
        </Form.Item>
        <Form.Item label="Description">
          {state.id_lang !== "" && (
            <Input.TextArea
              onChange={(e) => {
                setCharacterCounter({
                  ...characterCounter,
                  desc: e.target.value.length,
                });
                handleChange(e);
              }}
              name="description"
              value={state.description}
            />
          )}
          <FormDesc
            style={
              state.id_lang !== ""
                ? { textAlign: "right" }
                : { textAlign: "left" }
            }
          >
            {state.id_lang !== ""
              ? `${characterCounter.desc} of 160 characters allowed`
              : "Select the Language"}
          </FormDesc>
        </Form.Item>
        <Form.Item label="Category">
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            value={state.category}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={(value) => {
              setState({
                ...state,
                category: value,
                id_category: Number(value.split("-")[2]),
              });
            }}
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item label="Brand">
          <Select
            showSearch
            optionFilterProp="children"
            value={state.id_brand}
            onChange={(value) => setState({ ...state, id_brand: value })}
            onSearch={() => {}}
            filterOption={(input, option: any) => {
              return (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            {brandData.map((item: any, key: number) => (
              <Option key={key} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Condition">
          <Select
            showSearch
            optionFilterProp="children"
            value={state.id_status}
            onChange={(value) => setState({ ...state, id_status: value })}
            onSearch={() => {}}
            filterOption={(input, option: any) => {
              return (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            {conditionData.map((item: any, key: number) => (
              <Option key={key} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Meta title">
          {state.id_lang !== "" && (
            <Input
              onChange={(e) => {
                setCharacterCounter({
                  ...characterCounter,
                  meta_title: e.target.value.length,
                });
                handleChange(e);
              }}
              name="meta_title"
              value={state.meta_title}
              placeholder="To have a different title from the product name, enter it here."
            />
          )}
          <FormDesc
            style={
              state.id_lang !== ""
                ? { textAlign: "right" }
                : { textAlign: "left" }
            }
          >
            {state.id_lang !== ""
              ? `${characterCounter.meta_title} of 70 characters used (recommended)`
              : "Select the Language"}
          </FormDesc>
        </Form.Item>
        <Form.Item label="Meta description">
          {state.id_lang !== "" && (
            <Input.TextArea
              onChange={(e) => {
                setCharacterCounter({
                  ...characterCounter,
                  meta_desc: e.target.value.length,
                });
                handleChange(e);
              }}
              name="description"
              value={state.meta_descrpition}
              placeholder="To have a different description than your product summary in search results page, write it here."
            />
          )}
          <FormDesc
            style={
              state.id_lang !== ""
                ? { textAlign: "right" }
                : { textAlign: "left" }
            }
          >
            {state.id_lang !== ""
              ? `${characterCounter.meta_desc} of 160 characters used (recommended)`
              : "Select the Language"}
          </FormDesc>
        </Form.Item>
        <Form.Item label="Displayed">
          <Switch
            onChange={(e) => {
              setState({ ...state, active: e ? 1 : 0 });
            }}
            checked={state.active === 1 ? true : false}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
