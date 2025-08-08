import React from "react";
import JobForm from "./JobForm";
import "../index.css";

const JobFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{initialData ? "Edit Job" : "Add Job"}</h2>
        <JobForm onSubmit={onSubmit} initialData={initialData} />
      </div>
    </div>
  );
};

export default JobFormModal;
