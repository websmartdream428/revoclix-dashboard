import React from "react";
import { DatePicker, Form, Input, Modal, Radio, Select, Switch } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

import { ModalProps } from "types/ModalProps";

const CustomerModal: React.FC<ModalProps> = ({
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
      title="Customer"
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
        <Form.Item label="Social title">
          <Radio.Group name="social" defaultValue="mr">
            <Radio value="mr">Mr.</Radio>
            <Radio value="mrs">Mrs.</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="* First name">
          <Input />
        </Form.Item>
        <Form.Item label="* Last name">
          <Input />
        </Form.Item>
        <Form.Item label="* Email address">
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item label="* Password">
          <Input
            type="password"
            prefix={<KeyOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item label="Birthday">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Enabled">
          <Switch checked />
        </Form.Item>
        <Form.Item label="Partner offers">
          <Switch />
        </Form.Item>
        <Form.Item label="Group access">
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
        </Form.Item>
        <Form.Item label="Default customer group">
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerModal;
