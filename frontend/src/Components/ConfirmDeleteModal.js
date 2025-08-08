import React from "react";
import "../index.css";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, job }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Delete Job</h3>
        <p>
          Are you sure you want to delete <strong>{job.title}</strong> at{" "}
          <strong>{job.company}</strong>?
        </p>
        <div style={{ marginTop: "1rem" }}>
          <button className="btn-delete-confirm" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button
            className="btn-cancel"
            onClick={onClose}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
