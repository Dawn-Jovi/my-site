import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MyModal = ({ text, isOpen, onRequestClose }) => {

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
            width: '50%',
            maxWidth: '400px',
            padding: '10px',
            borderRadius: '8px',
            overflow:"hidden",
        }
    }}
    >

      <h2 style={{
        textAlign: "center",
      }}>
        <br />{text}<br />&nbsp;
      </h2>
      
    </Modal>
  );
};

export default MyModal;