import React from "react";

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Posted On:</strong> {job.posting_date}</p>
      <p><strong>Type:</strong> {job.job_type}</p>
      <button onClick={() => onEdit(job)}>Edit</button>
      <button onClick={() => onDelete(job)}>Delete</button>
    </div>
  );
};

export default JobCard;
