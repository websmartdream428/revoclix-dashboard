import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { ModalProps } from "types/ModalProps";
import { LanguageContext } from "context";
import { TranslateContext } from "context";
import FormDesc from "components/FormDesc/FormDesc";
import { toast, ToastContainer } from "react-toastify";
import { addTranslate, editTranslate } from "actions/translate.action";

const TranslateModal: React.FC<ModalProps> = ({
  visible,
  onCancel,
  onOk,
  data,
}) => {
  const { language } = useContext<any>(LanguageContext);
  const { setTranslate, translate } = useContext<any>(TranslateContext);
  const [state, setState] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(-1);

  useEffect(() => {
    let langData: any = [];
    let temp: any = {};
    language
      ?.filter((item: any) => Number(item.t_active) === 1)
      .forEach((item: any) => {
        temp[item.id] = "";
        langData.push({
          lang: item.id,
          text: "",
        });
      });
    setState({ ...temp, langData, _key: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (data.id) {
      let langData: any = [];
      language
        ?.filter((item: any) => Number(item.t_active) === 1)
        .forEach((item: any) => {
          const temp = data.langData.filter(
            (item1: any) => item1.lang === item.id
          );
          langData.push({
            lang: item.id,
            text: temp[0]?.text ? temp[0].text : "",
          });
        });
      setState({ ...data, langData });
      setEditId(data.id);
    }
  }, [data]);

  const defaultState = () => {
    setState({});
    setEditId(-1);
  };

  const handleSave = async () => {
    if (state._key === "" || !state._key) {
      toast.error("Key field is required!", {
        theme: "colored",
        autoClose: 3000,
      });
    } else {
      setLoading(true);
      const langData = state.langData.map((item: any) => {
        item.text = state[item.lang];
        return item;
      });
      const newData = {
        _key: state._key,
        langData,
      };
      if (editId > -1) {
        const res = await editTranslate(editId, newData);
        if (res.type === "success") {
          // let temp = await translate.map((item: any) => {
          //   if (item.id === editId) {
          //     return res.data;
          //   }
          //   return item;
          // });
          // console.log(temp);
          setTranslate([...res.data]);
          await defaultState();
          onOk();
        } else {
          toast.error(res.message, { theme: "colored", autoClose: 3000 });
        }
      } else {
        const res = await addTranslate(newData);
        if (res.type === "success") {
          setTranslate([...translate, ...res.data]);
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

  const handleChange = async (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      title="Translate"
      centered
      visible={visible}
      width={"90%"}
      onCancel={handleCancel}
      okButtonProps={{ loading: loading }}
      onOk={handleSave}
    >
      <ToastContainer />
      <Form
        style={{ width: "100%", maxWidth: "800px", margin: "auto" }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item label="* Key">
          <Input onChange={handleChange} name="_key" value={state._key} />
        </Form.Item>

        {language
          ?.filter((item: any) => Number(item.t_active) === 1)
          .map((item: any, key: any) => (
            <Form.Item key={key} label={item.iso_code}>
              <Input
                onChange={handleChange}
                name={item.id}
                value={state[item.id]}
              />
              <FormDesc>{`Input the text in ${item.name}`}</FormDesc>
            </Form.Item>
          ))}
      </Form>
    </Modal>
  );
};

export default TranslateModal;
