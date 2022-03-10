import React from "react";
import { Button, Form, Input, Modal, Switch, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ModalProps } from "types/ModalProps";

const TranslateModal: React.FC<ModalProps> = ({ visible, onCancel, onOk }) => {
  return (
    <Modal
      title="Languages"
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
        </Form.Item>

        <Form.Item label="* ISO code">
          <Input />
          <span>{"Two-letter ISO code (e.g. FR, EN, DE)"}</span>
        </Form.Item>
        <Form.Item label="* Language code">
          <Input />
          <span>{"IETF language tag(e.g. en-US, pt-BR)"}</span>
        </Form.Item>

        <Form.Item label="* Date format">
          <Input placeholder="Y-m-d" />
          <span>{"Short date format (e.g., Y-m-d)."}</span>
        </Form.Item>
        <Form.Item label="* Date format (full)">
          <Input placeholder="Y-m-d H:i:s" />
          <span>{"Full date format (e.g., Y-m-d H:i:s)."}</span>
        </Form.Item>
        <Form.Item label="* Flag">
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
          <span>{"Upload the country flag from your computer."}</span>
        </Form.Item>
        <Form.Item label="* 'No-picture' image">
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
          <span>{"Image is displayed when 'no picture is found'."}</span>
        </Form.Item>
        <Form.Item label="Status">
          <Switch />
          <br />
          <span>{"Activate this language."}</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TranslateModal;
