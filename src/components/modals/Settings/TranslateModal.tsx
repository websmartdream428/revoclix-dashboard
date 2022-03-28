import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { ModalProps } from "types/ModalProps";
import { LanguageContext } from "context";
import FormDesc from "components/FormDesc/FormDesc";
import { toast, ToastContainer } from "react-toastify";

const TranslateModal: React.FC<ModalProps> = ({ visible, onCancel, onOk }) => {
  const { language } = useContext<any>(LanguageContext);
  const [state, setState] = useState<any>({});

  useEffect(() => {}, [language]);

  const handleSave = async () => {
    console.log(state);
    if (state.key === "" || !state.key) {
      toast.error("Key field is required!", {
        theme: "colored",
        autoClose: 3000,
      });
    } else {
      const newData = {
        ...state,
      };
    }
  };

  const handleCancel = async () => {};

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
          <Input onChange={handleChange} name="key" value={state.key} />
        </Form.Item>

        {language
          ?.filter((item: any) => item.active === 1)
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
