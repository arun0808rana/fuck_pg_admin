import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const FilterAndSearch = ({showModal, setShowModal}) => {
  const handleOk = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <>

      <Modal title="Basic Modal" open={showModal} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default React.memo(FilterAndSearch);