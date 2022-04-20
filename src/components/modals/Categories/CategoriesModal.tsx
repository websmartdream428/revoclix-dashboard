import React, { useContext, useEffect, useRef, useState } from "react";
import {
  // Button,
  Form,
  Input,
  Modal,
  Select,
  Switch,
  Tag,
  Tooltip,
  TreeSelect,
  // Upload,
} from "antd";
// import { UploadOutlined } from "@ant-design/icons";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { PlusOutlined } from "@ant-design/icons";
import { ModalProps } from "types/ModalProps";
import { CategoryContext, LanguageContext } from "context";
import FormDesc from "components/FormDesc/FormDesc";
import { toast, ToastContainer } from "react-toastify";
import { addValidation } from "validation/category";
import { addCategory, editCategory } from "actions/category.action";
import MCI_List from "mockups/MaterialCommunityIcons.json";
import { Icon } from "@iconify/react";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CategoriesModal: React.FC<ModalProps> = ({
  visible,
  data,
  onCancel,
  onOk,
}) => {
  const { Option } = Select;
  const [state, setState] = useState<any>({
    id_lang: "",
    name: "",
    active: 0,
    parent: "",
    id_parent: 0,
    level_depth: 0,
    iconFamily: "aaa",
    backgroundColor: "bbb",
    color: "ccc",
    description: "",
    url_rewriting: "",
    meta_title: "",
    meta_keywords: [],
    meta_description: "",
    langData: [],
    icon: "",
  });
  const [tagState, setTagState] = useState<any>({
    tags: [],
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  });
  const saveEditInputRef = useRef<any>(null);
  const saveInputRef = useRef<any>(null);
  const { category, setCategory } = useContext<any>(CategoryContext);
  const { language } = useContext<any>(LanguageContext);
  const [editorState, setEditorState] = useState<any>("");
  const [characterCounter, setCharacterCounter] = useState({
    desc: 0,
    m_title: 0,
    m_desc: 0,
  });
  const [editId, setEditId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    if (data.id) {
      const parent = category.filter(
        (item: any) => Number(item.id) === Number(data.id_parent)
      )[0];
      if (data.meta_keywords) {
        setTagState({
          ...tagState,
          tags: data.meta_keywords === "" ? [] : data.meta_keywords.split(","),
        });
      }
      setState({
        id_lang: data.id_lang,
        name: data.name,
        active: data.active,
        parent: parent
          ? `${parent.level_depth}-${parent.id_parent}-${parent.id}`
          : "",
        id_parent: data.id_parent,
        level_depth: data.level_depth,
        iconFamily: data.iconFamily,
        backgroundColor: data.backgroundColor,
        color: data.color,
        description: data.description,
        meta_keywords: data.meta_keywords ? data.meta_keywords.split(",") : [],
        url_rewriting: data.url_rewriting,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        langData: data.langData,
        icon: data.icon,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setTreeData(func(0, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const func = (pid: number, depth: number) => {
    var lookup: any = {};
    var items = category;
    var categoryTemp = [];

    for (var item, i = 0; (item = items[i++]); ) {
      var name = item.id;

      if (!(name in lookup)) {
        lookup[name] = 1;
        categoryTemp.push(item);
      }
    }
    let temp: any = categoryTemp.filter(
      (item: any) => item.id_parent === pid && item.level_depth === depth
    );
    let temp1 = temp.map((item: any) => ({
      value: `${item.level_depth}-${item.id_parent}-${item.id}`,
      title: item.name,
      key: `${item.level_depth}-${item.id_parent}-${item.id}`,
      children: func(item.id, item.level_depth + 1),
    }));
    if (temp1.length > 0) {
      return temp1;
    } else {
      return;
    }
  };

  const defaultState = () => {
    setEditorState("");
    setState({
      id_lang: "",
      name: "",
      active: 0,
      parent: "",
      id_parent: 0,
      level_depth: 0,
      iconFamily: "",
      backgroundColor: "",
      color: "",
      description: "",
      url_rewriting: "",
      meta_title: "",
      meta_keywords: [],
      meta_description: "",
      langData: [],
      icon: "",
      // filePath: "",
      // file: [],
      // flag_updated: false,
    });
    setTagState({
      tags: [],
      inputVisible: false,
      inputValue: "",
      editInputIndex: -1,
      editInputValue: "",
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
        const newData = {
          ...state,
          meta_keywords: tagState.tags === [] ? "" : tagState.tags.toString(),
        };
        const res = await addCategory(newData);
        if (res.type === "success") {
          setCategory([...category, res.data]);
          await defaultState();
          onOk();
        } else {
          toast.error(res.message, { theme: "colored", autoClose: 3000 });
        }
      } else {
        const res = await editCategory(editId, state);
        if (res.type === "success") {
          if (
            category.filter(
              (item: any) =>
                item.id === editId && item.id_lang === state.id_lang
            ).length > 0
          ) {
            let temp = await category.map((item: any) => {
              if (item.id === editId && item.id_lang === state.id_lang) {
                return res.data;
              }
              return item;
            });
            setCategory(temp);
          } else {
            setCategory([...category, res.data]);
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

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // const customFileAction = ({ file, onSuccess }: any) => {
  //   setTimeout(() => {
  //     setState({ ...state, file: [file] });
  //     onSuccess("ok");
  //   }, 0);
  // };

  // const beforeUpload = (e: any) => {
  //   if (e.type.split("/")[0] !== "image") {
  //     toast.error("you can upload only Image file.", {
  //       theme: "colored",
  //       autoClose: 3000,
  //     });
  //     setState({ ...state, file: [] });
  //   }
  // };

  // const handleFileUpload = (e: any) => {
  //   if (e?.file?.originFileObj?.type.split("/")[0] !== "image") {
  //     setState({ ...state, file: [] });
  //   } else {
  //     setState({ ...state, flag_updated: true });
  //   }
  // };

  // const handleFileRemove = () => {
  //   setState({ ...state, file: [] });
  // };

  /////////////////////////////////////////////////////////////////////
  const handleEditInputChange = (e: any) => {
    setTagState({ ...tagState, editInputValue: e.target.value });
  };

  const onChange = (value: any) => {
    setState({ ...state, icon: value });
  };

  const onSearch = (val: any) => {
    console.log("search:", val);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tagState.tags];
    newTags[tagState.editInputIndex] = tagState.editInputValue;
    setTagState({
      tags: newTags,
      editInputIndex: -1,
      editInputValue: "",
    });
    setState({ ...state, meta_keywords: newTags });
  };

  const handleClose = (removedTag: any) => {
    const tags = tagState.tags.filter((tag: any) => tag !== removedTag);
    setTagState({ ...tagState, tags });
  };

  const handleInputChange = (e: any) => {
    setTagState({ ...tagState, inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    let tags: any = [...tagState.tags];
    if (
      tagState.inputValue &&
      tagState.tags.indexOf(tagState.inputValue) === -1
    ) {
      tags = [...tagState.tags, tagState.inputValue];
    }
    setState({ ...state, meta_keywords: tags });
    setTagState({
      ...tagState,
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  const showInput = async () => {
    await setTagState({ ...tagState, inputVisible: true });
    saveInputRef.current.focus();
  };

  return (
    <Modal
      title="Category"
      centered
      visible={visible}
      width={"90%"}
      onCancel={handleCancel}
      onOk={handleSave}
      okButtonProps={{ loading: loading }}
    >
      <ToastContainer />
      <Form
        style={{ width: "100%", maxWidth: "900px", margin: "auto" }}
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
              setState({
                ...state,
                id_lang: value,
                name: temp?.name ? temp.name : "",
                url_rewriting: temp?.url_rewriting ? temp?.url_rewriting : "",
                meta_title: temp?.meta_title ? temp?.meta_title : "",
                meta_description: temp?.meta_description
                  ? temp?.meta_description
                  : "",
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
              ? "Invalid characters: <>;=#{}"
              : "Select the Language"}
          </FormDesc>
        </Form.Item>
        <Form.Item label="Displayed">
          <Switch
            onChange={(e) => {
              setState({ ...state, active: e ? 1 : 0 });
            }}
            checked={state.active}
          />
        </Form.Item>
        <Form.Item label="Parent Category">
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            value={state.parent}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={(value, key, e) => {
              setState({
                ...state,
                parent: value,
                level_depth: Number(value.split("-")[0]),
                id_parent: Number(value.split("-")[2]),
              });
            }}
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item label="Description">
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
              ? `${characterCounter.desc} of 27844 characters allowed`
              : "Select the Language"}
          </FormDesc>
        </Form.Item>
        <Form.Item label="Select Category Icon">
          <Select
            showSearch
            placeholder="Select an Icon name"
            optionFilterProp="children"
            value={state.icon}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option: any) => {
              return (
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            {Object.keys(MCI_List).map((item: string, key: number) => (
              <Option key={key} value={item}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Icon icon={`mdi:${item}`} /> {` ${item}`}
                </div>
              </Option>
            ))}
          </Select>
          <a href="https://icons.expo.fyi/" target="_blank" rel="noreferrer">
            Icon List
          </a>
        </Form.Item>
        {/* <Form.Item label="Category cover image">
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
        </Form.Item> */}
        <Form.Item label="Meta title">
          {state.id_lang !== "" && (
            <Input
              placeholder="To have a different title from the category name, enter it here."
              onChange={handleChange}
              name="meta_title"
              value={state.meta_title}
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
              ? `${characterCounter} of 70 characters allowed`
              : "Select the Language"}
          </FormDesc>
        </Form.Item>
        <Form.Item label="Meta description">
          {state.id_lang !== "" && (
            <Input.TextArea
              placeholder="To have a different description than your category summary in search results page, write it here."
              onChange={handleChange}
              name="meta_description"
              value={state.meta_description}
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
        <Form.Item label="Meta keywords">
          <div>
            {tagState.tags.map((tag: any, index: number) => {
              if (tagState.editInputIndex === index) {
                return (
                  <Input
                    ref={saveEditInputRef}
                    key={tag}
                    size="small"
                    className="tag-input"
                    style={{
                      width: "auto",
                      marginRight: "10px",
                      maxWidth: "100px",
                    }}
                    value={tagState.editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }

              const isLongTag = tag.length > 20;

              const tagElem = (
                <Tag
                  className="edit-tag"
                  key={tag}
                  closable={true}
                  onClose={() => handleClose(tag)}
                >
                  <span
                    onDoubleClick={async (e: any) => {
                      await setTagState({
                        ...tagState,
                        editInputIndex: index,
                        editInputValue: tag,
                      });
                      saveEditInputRef.current.focus();
                      e.preventDefault();
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}

            {tagState.inputVisible && (
              <Input
                id="saveInputRef"
                ref={saveInputRef}
                type="text"
                size="small"
                style={{
                  width: "auto",
                  maxWidth: "100px",
                }}
                className="tag-input"
                value={tagState.inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!tagState.inputVisible && (
              <Tag className="site-tag-plus" onClick={showInput}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </div>
          <FormDesc>
            {
              "To add tags, click in the field, write something, and then press the 'Enter' key. Invalid characters: <>;=#{}"
            }
          </FormDesc>
        </Form.Item>
        <Form.Item label="* Friendly URL">
          <Input
            onChange={handleChange}
            name="url_rewriting"
            value={state.url_rewriting}
          />
          <FormDesc>
            {
              "Only letteres, numbers, underscore(_) and the minus(-) character are allowed."
            }
          </FormDesc>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoriesModal;
