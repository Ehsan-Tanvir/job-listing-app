import React, { useEffect, useState } from "react";
import { fetchJobs, addJob, updateJob, deleteJob } from "./api";
import JobList from "./Components/JobList";
import JobForm from "./Components/JobForm";
import FilterSortJob from "./Components/FilterSortJob";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [filters, setFilters] = useState({
    location: "",
    job_type: "",
    sort: "desc",
  });

  useEffect(() => {
    loadJobs(filters);
  }, [filters]);

  const loadJobs = async (filters) => {
    const query = new URLSearchParams();

    if (filters.location) query.append("location", filters.location);
    if (filters.job_type) query.append("job_type", filters.job_type);
    if (filters.sort) query.append("sort", filters.sort);

    const data = await fetchJobs(query.toString());
    setJobs(data);
  };

  const handleAddOrEdit = async (job) => {
    if (editingJob) {
      await updateJob(editingJob.id, job);
    } else {
      await addJob(job);
    }
    setEditingJob(null);
    loadJobs(filters);
  };

  const handleDelete = async (job) => {
    await deleteJob(job.id);
    loadJobs(filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="app">
      <h1>Job Manager</h1>
      <FilterSortJob onFilter={handleFilterChange} />
      <JobForm onSubmit={handleAddOrEdit} initialData={editingJob} />
      <JobList jobs={jobs} onEdit={setEditingJob} onDelete={handleDelete} />
    </div>
  );
};

export default App;
