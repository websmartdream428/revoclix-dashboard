import React from "react";
import { Button, Form, Input, Modal, Select, Switch, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { ModalProps } from "types/ModalProps";

const ProductModal: React.FC<ModalProps> = ({
  visible,
  // data,
  onCancel,
  onOk,
}) => {
  const { Option } = Select;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  return (
    <Modal
      title="Product"
      centered
      visible={visible}
      width={"90%"}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        style={{ width: "80%", marginLeft: "auto" }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item label="*Name">
          <Input />
          <span>{"Invalid characters: <>;=#{}"}</span>
        </Form.Item>
        <Form.Item label="Displayed">
          <Switch />
        </Form.Item>
        <Form.Item label="Category cover image">
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Category thumbnail">
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
          <span>{"Displays a small image in the parent category's page."}</span>
        </Form.Item>
        <Form.Item label="Menu thumbnails">
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
          <span>
            {
              "The category thumbnail appears in the menu as a small image representing the category"
            }
          </span>
        </Form.Item>
        <Form.Item label="Meta title">
          <Input placeholder="To have a different title from the category name, enter it here." />
          <span>{"0 of 70 characters used (recommended)"}</span>
        </Form.Item>
        <Form.Item label="Meta description">
          <Input.TextArea placeholder="To have a different description than your category summary in search results page, write it here." />
          <span>{"0 of 160 characters used (recommended)"}</span>
        </Form.Item>
        <Form.Item label="Meta keywords">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Add tag"
            defaultValue={["a10", "c12"]}
            onChange={handleChange}
          >
            {children}
          </Select>
          <span>
            {
              "To add tags, click in the field, write something, and then press the 'Enter' key. Invalid characters: <>;=#{}"
            }
          </span>
        </Form.Item>
        <Form.Item label="* Friendly URL">
          <Input />
          <span>
            {
              "Only letteres, numbers, underscore(_) and the minus(-) character are allowed."
            }
          </span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
