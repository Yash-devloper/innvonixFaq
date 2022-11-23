import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this faq?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onConfirm(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onConfirm(true)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
