import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs, onEdit, onDelete }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default JobList;
