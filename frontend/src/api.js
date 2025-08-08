const BASE_URL = "http://localhost:5000/jobs";
const SCRAPE_URL = "http://localhost:5000/scrape";

export const fetchJobs = async (query = "") => {
  const res = await fetch(`${BASE_URL}?${query}`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return await res.json();
};

export const addJob = async (job) => {
  const response = await fetch("http://localhost:5000/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([job]), // send as list
  });

  const data = await response.json();

  if (!response.ok) {
    // Throw to trigger catch in App.js
    const error = new Error(data.error || "Failed to add job");
    error.response = { data };
    throw error;
  }

  return data;
};

export const updateJob = async (id, job) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.error || "Failed to update job");
    error.response = { data };
    throw error;
  }

  return data;
};

export const deleteJob = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const data = await res.json();
    const error = new Error(data.error || "Failed to delete job");
    error.response = { data };
    throw error;
  }
};

export const scrapeJobs = async ({ num_pages }) => {
  const response = await fetch(SCRAPE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ num_pages }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || "Failed to scrape jobs");
    error.response = { data };
    throw error;
  }

  return data;
};
