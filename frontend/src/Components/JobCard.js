const JobCard = ({ job, onEdit, onDelete }) => {
  // Split and slice the tags
  const displayedTags = Array.isArray(job.tags)
    ? job.tags.slice(0, 10)
    : job.tags?.split(",").slice(0, 10);

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>
        <strong>Company:</strong> {job.company}
      </p>
      <p>
        <strong>Country:</strong> {job.country}
      </p>
      <p>
        <strong>City:</strong> {job.city}
      </p>
      <p>
        <strong>Posted On:</strong> {job.posted_date}
      </p>
      <p>
        <strong>Job Type:</strong> {job.job_type}
      </p>
      <div>
        <strong>Tags:</strong>{" "}
        <div className="tag-container">
          {displayedTags.map((tag, index) => (
            <span key={index} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="job-card-buttons">
        <button className="btn-edit" onClick={() => onEdit(job)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(job)}>
          Delete
        </button>
        {job.link && (
          <a
            href={job.link}
            className="btn-view"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", float: "right" }}
          >
            More Info
          </a>
        )}
      </div>
    </div>
  );
};

export default JobCard;
