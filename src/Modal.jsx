import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MyModal = ({ isOpen, onRequestClose }) => {

  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="提示"
        style={{
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '500px',
            padding: '20px',
            borderRadius: '8px'
        }
    }}
    >
      <h2>这么作？今天别吃了！</h2>
      <button onClick={onRequestClose}>关闭</button>
    </Modal>
  );
};

export default MyModal;