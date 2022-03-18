import React, { useContext, useState } from "react";
import { Button, Form, Input, Modal, Switch, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ModalProps } from "types/ModalProps";
import { addValidation } from "validation/langauge";
import { toast, ToastContainer } from "react-toastify";
import { addLanguage } from "actions/language.action";
import { LanguageContext } from "context";

const LanguageModal: React.FC<ModalProps> = ({ visible, onCancel, onOk }) => {
  const [state, setState] = useState<any>({
    name: "",
    iso_code: "",
    date_format: "",
    date_format_full: "",
    code: "",
    active: 0,
    file: [],
  });
  const { language, setLanguage } = useContext<any>(LanguageContext);
  const [loading, setLoading] = useState(false);

  const defaultState = () => {
    setState({
      name: "",
      iso_code: "",
      date_format: "",
      date_format_full: "",
      code: "",
      active: 0,
      file: [],
    });
  };

  const handleSave = async () => {
    const valid = await addValidation(state);
    if (!valid.valid) {
      toast.error(valid.message, { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      const res = await addLanguage(state);
      if (res.type === "success") {
        setLanguage([...language, res.data]);
        await defaultState();
        onOk();

        setLoading(false);
      } else {
        toast.error(res.message, { theme: "colored", autoClose: 3000 });
      }
    }
  };

  const handleCancel = async () => {
    await defaultState();
    onCancel();
  };

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const beforeUpload = (e: any) => {
    if (e.type.split("/")[0] !== "image") {
      toast.error("you can upload only Image file.", {
        theme: "colored",
        autoClose: 3000,
      });
      setState({ ...state, file: [] });
    }
  };

  const handleFileUpload = (e: any) => {
    if (e.file.originFileObj.type.split("/")[0] !== "image") {
      setState({ ...state, file: [] });
    }
  };

  const customFileAction = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      setState({ ...state, file: [file] });
      onSuccess("ok");
    }, 0);
  };

  const handleFileRemove = () => {
    setState({ ...state, file: [] });
  };

  return (
    <Modal
      title="Language"
      centered
      visible={visible}
      width={"90%"}
      onCancel={handleCancel}
      onOk={handleSave}
      okButtonProps={{ loading: loading }}
    >
      <ToastContainer />
      <Form
        style={{ width: "80%", marginLeft: "auto" }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item label="*Name">
          <Input onChange={handleChange} name="name" value={state.name} />
        </Form.Item>

        <Form.Item label="* ISO code">
          <Input
            onChange={handleChange}
            name="iso_code"
            value={state.iso_code}
          />
          <span>{"Two-letter ISO code (e.g. FR, EN, DE)"}</span>
        </Form.Item>
        <Form.Item label="* Language code">
          <Input onChange={handleChange} name="code" value={state.code} />
          <span>{"IETF language tag(e.g. en-US, pt-BR)"}</span>
        </Form.Item>

        <Form.Item label="* Date format">
          <Input
            placeholder="Y-m-d"
            onChange={handleChange}
            name="date_format"
            value={state.date_format}
          />
          <span>{"Short date format (e.g., Y-m-d)."}</span>
        </Form.Item>
        <Form.Item label="* Date format (full)">
          <Input
            placeholder="Y-m-d H:i:s"
            onChange={handleChange}
            name="date_format_full"
            value={state.date_format_full}
          />
          <span>{"Full date format (e.g., Y-m-d H:i:s)."}</span>
        </Form.Item>
        <Form.Item label="* Flag">
          <Upload
            name="flag"
            customRequest={customFileAction}
            listType="picture"
            beforeUpload={beforeUpload}
            onChange={handleFileUpload}
            multiple={false}
            onRemove={handleFileRemove}
            fileList={state.file}
          >
            {state.file.length > 0 ? (
              ""
            ) : (
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            )}
          </Upload>
          <span>{"Upload the country flag from your computer."}</span>
        </Form.Item>
        <Form.Item label="Status">
          <Switch
            onChange={(e) => {
              setState({ ...state, active: e ? 1 : 0 });
            }}
          />
          <br />
          <span>{"Activate this language."}</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LanguageModal;
