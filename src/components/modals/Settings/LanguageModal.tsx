import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Switch, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ModalProps } from "types/ModalProps";
import { addValidation } from "validation/langauge";
import { toast, ToastContainer } from "react-toastify";
import { addLanguage, editLanguage } from "actions/language.action";
import { LanguageContext } from "context";
import { FormDesc } from "components";

const LanguageModal: React.FC<ModalProps> = ({
  visible,
  onCancel,
  onOk,
  data,
}) => {
  const [state, setState] = useState<any>({
    name: "",
    iso_code: "",
    date_format: "",
    date_format_full: "",
    code: "",
    active: 0,
    t_active: 0,
    filePath: "",
    file: [],
    flag_updated: false,
  });
  const { language, setLanguage } = useContext<any>(LanguageContext);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(-1);

  useEffect(() => {
    if (data.id) {
      setState({
        name: data.name,
        iso_code: data.iso_code,
        date_format: data.date_format,
        date_format_full: data.date_format_full,
        code: data.code,
        active: data.active,
        t_active: data.t_active,
        filePath: data.flag,
        file: [],
        flag_updated: false,
      });
      setEditId(data.id);
    }
  }, [data]);

  const defaultState = () => {
    setState({
      name: "",
      iso_code: "",
      date_format: "",
      date_format_full: "",
      code: "",
      active: 0,
      t_active: 0,
      filePath: "",
      file: [],
      flag_updated: false,
    });
    setEditId(-1);
  };

  const handleSave = async () => {
    const valid = await addValidation(editId, state);
    if (!valid.valid) {
      toast.error(valid.message, { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      if (editId < 0) {
        const res = await addLanguage(state);
        if (res.type === "success") {
          setLanguage([...language, res.data]);
          await defaultState();
          onOk();
        } else {
          toast.error(res.message, { theme: "colored", autoClose: 3000 });
        }
      } else {
        const res = await editLanguage(editId, state);
        if (res.type === "success") {
          let temp = await language.map((item: any) => {
            if (item.id === editId) {
              return res.data;
            }
            return item;
          });
          setLanguage(temp);
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
    if (e?.file?.originFileObj?.type.split("/")[0] !== "image") {
      setState({ ...state, file: [] });
    } else {
      setState({ ...state, flag_updated: true });
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
        style={{ width: "100%", maxWidth: "800px", margin: "auto" }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
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
          <FormDesc>{"Two-letter ISO code (e.g. FR, EN, DE)"}</FormDesc>
        </Form.Item>
        <Form.Item label="* Language code">
          <Input onChange={handleChange} name="code" value={state.code} />
          <FormDesc>{"IETF language tag(e.g. en-US, pt-BR)"}</FormDesc>
        </Form.Item>

        <Form.Item label="* Date format">
          <Input
            placeholder="Y-m-d"
            onChange={handleChange}
            name="date_format"
            value={state.date_format}
          />
          <FormDesc>{"Short date format (e.g., Y-m-d)."}</FormDesc>
        </Form.Item>
        <Form.Item label="* Date format (full)">
          <Input
            placeholder="Y-m-d H:i:s"
            onChange={handleChange}
            name="date_format_full"
            value={state.date_format_full}
          />
          <FormDesc>{"Full date format (e.g., Y-m-d H:i:s)."}</FormDesc>
        </Form.Item>
        <Form.Item label="* Flag">
          {state.filePath && (
            <img
              src={state.filePath}
              alt="flag"
              width="80px"
              style={{ objectFit: "cover", marginRight: "10px" }}
              height="40px"
            />
          )}
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

          <FormDesc>{"Upload the country flag from your computer."}</FormDesc>
        </Form.Item>
        <Form.Item label="Status">
          <Switch
            onChange={(e) => {
              setState({ ...state, active: e ? 1 : 0 });
            }}
            checked={state.active}
          />
          <br />
          <FormDesc>{"Activate this language."}</FormDesc>
        </Form.Item>
        <Form.Item label="Translate">
          <Switch
            onChange={(e) => {
              setState({ ...state, t_active: e ? 1 : 0 });
            }}
            checked={state.t_active}
          />
          <br />
          <FormDesc>{"Activate this language for Translate."}</FormDesc>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LanguageModal;
