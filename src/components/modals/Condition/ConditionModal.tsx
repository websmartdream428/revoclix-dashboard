import { Form, Input, Modal, Select } from "antd";
import FormDesc from "components/FormDesc/FormDesc";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ModalProps } from "types/ModalProps";
import { ConditionContext, LanguageContext } from "context";
import { addValidation } from "validation/condition";
import { addCondition, editCondition } from "actions/condition.action";

const ConditionModal: React.FC<ModalProps> = ({
  visible,
  data,
  onCancel,
  onOk,
}) => {
  const { Option } = Select;
  const [editId, setEditId] = useState(-1);
  const { condition, setCondition } = useContext<any>(ConditionContext);
  const { language } = useContext<any>(LanguageContext);
  const [state, setState] = useState({
    id_lang: "",
    name: "",
    _order: 1,
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [characterCounter, setCharacterCounter] = useState(0);

  useEffect(() => {
    if (data.id) {
      setState({
        id_lang: data.id_lang,
        name: data.name,
        description: data.description,
        _order: Number(data._order),
      });
      setEditId(data.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setState({ ...state, _order: condition.length + 1 });
  }, [condition]);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const defaultState = async () => {
    setState({
      id_lang: "",
      name: "",
      _order: condition.length + 1,
      description: "",
    });
    setEditId(-1);
  };

  const handleSave = async () => {
    const valid = await addValidation(state);
    if (!valid.valid) {
      toast.error(valid.message, { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      if (editId < 0) {
        const res = await addCondition(state);
        if (res.type === "success") {
          setCondition([...condition, res.data]);
          await defaultState();
          onOk();
        } else {
          toast.error(res.message, { theme: "colored", autoClose: 3000 });
        }
      } else {
        const res = await editCondition(editId, state);
        if (res.type === "success") {
          if (
            condition.filter(
              (item: any) =>
                item.id === editId && item.id_lang === state.id_lang
            ).length > 0
          ) {
            let temp = await condition.map((item: any) => {
              if (item.id === editId && item.id_lang === state.id_lang) {
                return res.data;
              }
              return item;
            });
            setCondition(temp);
          } else {
            setCondition([...condition, res.data]);
          }
          await defaultState();
          onOk();
        } else {
          toast.error(res.message, { theme: "colored", autoClose: 3000 });
        }
      }
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    await defaultState();
    onCancel();
  };

  return (
    <Modal
      title="Condition"
      centered
      visible={visible}
      width={"90%"}
      onCancel={handleCancel}
      onOk={handleSave}
      okButtonProps={{ loading: loading }}
    >
      <ToastContainer />

      <Form
        style={{ width: "100%", maxWidth: "800px", margin: "auto" }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item label="* Order">
          <Input
            onChange={handleChange}
            name="_order"
            value={state._order}
            type="number"
            min={1}
            max={9}
          />
          <FormDesc>{"Min : 1, Max : 9"}</FormDesc>
        </Form.Item>
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
                setCharacterCounter(e.target.value.length);
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
              ? `${characterCounter} of 160 characters allowed`
              : "Select the Language"}
          </FormDesc>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ConditionModal;
