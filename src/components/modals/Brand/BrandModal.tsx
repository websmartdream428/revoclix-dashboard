import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Switch, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { FormDesc } from "components";
import { ModalProps } from "types/ModalProps";
import { BrandContext, LanguageContext } from "context";
import { toast, ToastContainer } from "react-toastify";
import { addValidation } from "validation/brand";
import { addBrand, editBrand } from "actions/brand.action";

const BrandModal: React.FC<ModalProps> = ({
  visible,
  data,
  onCancel,
  onOk,
}) => {
  const { Option } = Select;
  const [state, setState] = useState<any>({
    name: "",
    meta_title: "",
    active: 0,
    description: "",
    descriptions: [],
    id_lang: "",
    filePath: "",
    file: [],
    flag_updated: false,
  });
  const [characterCounter, setCharacterCounter] = useState(0);
  const [editorState, setEditorState] = useState<any>("");
  const { brand, setBrand } = useContext<any>(BrandContext);
  const { language } = useContext<any>(LanguageContext);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(-1);

  useEffect(() => {
    if (data.id) {
      setState({
        name: data.name,
        meta_title: data.meta_title,
        active: data.active,
        id_lang: data.id_lang,
        description: data.description,
        descriptions: data.descriptions,
        filePath: data.logo,
        file: [],
        flag_updated: false,
      });
      setEditId(data.id);
      setEditorState(() => {
        const blocksFromHTML = htmlToDraft(data.description + "");
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );

        return EditorState.createWithContent(contentState);
      });
    }
  }, [data]);

  const defaultState = () => {
    setState({
      name: "",
      meta_title: "",
      active: 0,
      description: "",
      descriptions: [],
      id_lang: "",
      filePath: "",
      file: [],
      flag_updated: false,
    });
    setEditId(-1);
    setEditorState("");
  };

  const handleSave = async () => {
    const valid = await addValidation(editId, state);
    if (!valid.valid) {
      toast.error(valid.message, { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      if (editId < 0) {
        const res = await addBrand(state);
        if (res.type === "success") {
          setBrand([...brand, res.data]);
          await defaultState();
          onOk();
        } else {
          toast.error(res.message, { theme: "colored", autoClose: 3000 });
        }
      } else {
        const res = await editBrand(editId, state);
        if (res.type === "success") {
          let temp = await brand.map((item: any) => {
            if (item.id === editId) {
              return res.data;
            }
            return item;
          });
          setBrand(temp);
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

  const handleEditorChange = (e: any) => {
    if (state.id_lang !== "") {
      setCharacterCounter(
        editorState.getCurrentContent().getPlainText().length
      );
      if (editorState.getCurrentContent().getPlainText().length <= 27844) {
        setState({ ...state, description: draftToHtml(e) });
      }
    }
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
      title="Brand"
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
        <Form.Item label="* Name">
          <Input onChange={handleChange} name="name" value={state.name} />
          <FormDesc>{"Invalid characters: <>;=#{}"}</FormDesc>
        </Form.Item>

        <Form.Item label="Description">
          <Select
            style={{ width: 150, marginBottom: 5 }}
            value={state.id_lang}
            placeholder="Select the language"
            onChange={(value) => {
              const temp = data.descriptions?.filter(
                (item: any) => item.id_lang === value
              )[0];
              setEditorState(() => {
                const blocksFromHTML = htmlToDraft(
                  temp?.description ? temp.description + "" : ""
                );
                const contentState = ContentState.createFromBlockArray(
                  blocksFromHTML.contentBlocks,
                  blocksFromHTML.entityMap
                );

                return EditorState.createWithContent(contentState);
              });
              setState({ ...state, id_lang: value });
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
          {state.id_lang !== "" && (
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              onContentStateChange={handleEditorChange}
              toolbarStyle={{ border: "1px solid #ddd" }}
              editorStyle={{
                height: "200px",
                border: "1px solid #ddd",
                padding: "0 10px",
              }}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "emoji",
                  "fontFamily",
                  "fontSize",
                  "list",
                  "textAlign",
                  "history",
                ],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
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
              ? `${characterCounter} of 27844 characters allowed`
              : "Select the Language"}
          </FormDesc>
        </Form.Item>

        <Form.Item label="* Logo">
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
            name="logo"
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
          <FormDesc>{"Upload a brand logo from your computer."}</FormDesc>
        </Form.Item>
        <Form.Item label="Meta title">
          <Input
            placeholder="To have a different title from the category name, enter it here."
            onChange={handleChange}
            name="meta_title"
            value={state.meta_title}
          />
          <FormDesc>{"Invalid characters: <>;=#{}"}</FormDesc>
        </Form.Item>
        <Form.Item label="Displayed">
          <Switch
            onChange={(e) => {
              setState({ ...state, active: e ? 1 : 0 });
            }}
            checked={state.active}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BrandModal;
