import React from "react";
import { Button, Form, Input, Modal, Select, Switch, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { ModalProps } from "types/ModalProps";

const BrandModal: React.FC<ModalProps> = ({
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
      title="Brand"
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
        <Form.Item label="* Name">
          <Input />
          <span>{"Invalid characters: <>;=#{}"}</span>
        </Form.Item>

        <Form.Item label="Logo">
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>

          <span>{"Upload a brand logo from your computer."}</span>
        </Form.Item>
        <Form.Item label="Meta title">
          <Input placeholder="To have a different title from the category name, enter it here." />
          <span>{"Invalid characters: <>;=#{}"}</span>
        </Form.Item>
        <Form.Item label="Displayed">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BrandModal;
