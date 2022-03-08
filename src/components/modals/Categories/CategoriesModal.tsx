import React from "react";
import { Modal } from "antd";

import { CategoryModal } from "types/ModalProps";

const CategoriesModal: React.FC<CategoryModal> = ({
  visible,
  // data,
  onCancel,
  onOk,
}) => {
  return (
    <Modal
      title="Category"
      centered
      visible={visible}
      width={"90%"}
      onCancel={onCancel}
      onOk={onOk}
    >
      asdf
    </Modal>
  );
};

export default CategoriesModal;
