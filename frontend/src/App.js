import React, { useEffect, useState, useCallback } from "react";
import { fetchJobs, addJob, updateJob, deleteJob, scrapeJobs } from "./api";
import JobList from "./Components/JobList";
import JobFormModal from "./Components/JobFormModal";
import FilterSortJob from "./Components/FilterSortJob";
import ConfirmDeleteModal from "./Components/ConfirmDeleteModal";
import ScrapeModal from "./Components/ScrapeModal";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrapeModalOpen, setScrapeModalOpen] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const [filters, setFilters] = useState({
    company: "",
    country: "",
    job_type: "",
    sort: "",
    tags: "",
  });

  const loadJobs = useCallback(async () => {
    const query = new URLSearchParams();

    if (filters.company) query.append("company", filters.company);
    if (filters.country) query.append("country", filters.country);
    if (filters.job_type) query.append("job_type", filters.job_type);
    if (filters.sort) query.append("sort", filters.sort);
    if (filters.tags) query.append("tags", filters.tags);

    const data = await fetchJobs(query.toString());
    setJobs(data);
  }, [filters]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleAddOrEdit = async (job) => {
    try {
      if (editingJob) {
        await updateJob(editingJob.id, job);
        alert("Job updated successfully!");
      } else {
        await addJob(job); // <- expect job as an array here if backend expects list
        alert("Job added successfully!");
      }
      setEditingJob(null);
      setIsModalOpen(false);
      loadJobs();
    } catch (err) {
      // Show backend error response if available
      if (err.response && err.response.data && err.response.data.error) {
        alert("Error: " + err.response.data.error);
      } else if (err.message) {
        alert("Error: " + err.message);
      } else {
        alert("Unknown error occurred.");
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (jobToDelete) {
      try {
        await deleteJob(jobToDelete.id);
        alert("Job deleted successfully!");
        setDeleteModalOpen(false);
        setJobToDelete(null);
        loadJobs();
      } catch (err) {
        alert("Failed to delete job.");
        console.error(err);
      }
    }
  };

  const handleScrape = async (numPages) => {
    setIsScraping(true);
    try {
      await scrapeJobs({ num_pages: numPages });
      alert("Jobs scraped successfully!");
      await loadJobs();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        alert("Scraping failed: " + err.response.data.error);
      } else {
        alert("Scraping failed. See console for details.");
      }
      console.error(err);
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <div className="app">
      <h1>Job Listing Web App</h1>

      <div className="filter-action-bar">
        <FilterSortJob onFilter={setFilters} />
        <div className="action-buttons">
          <button
            className="btn-add"
            onClick={() => {
              setEditingJob(null);
              setIsModalOpen(true);
            }}
          >
            Add Job
          </button>
          <button
            className="btn-scrape"
            onClick={() => setScrapeModalOpen(true)}
          >
            Scrape
          </button>
        </div>
      </div>

      <JobList
        jobs={jobs}
        onEdit={(job) => {
          setEditingJob(job);
          setIsModalOpen(true);
        }}
        onDelete={(job) => {
          setJobToDelete(job);
          setDeleteModalOpen(true);
        }}
      />

      <JobFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOrEdit}
        initialData={editingJob}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        job={jobToDelete}
      />

      <ScrapeModal
        isOpen={scrapeModalOpen}
        onClose={() => setScrapeModalOpen(false)}
        onScrape={handleScrape}
      />

      {isScraping && (
        <div className="scrape-spinner-overlay">
          <div className="scrape-spinner" />
          <p className="scrape-text">Scraping jobs…</p>
        </div>
      )}
    </div>
  );
};

export default App;
