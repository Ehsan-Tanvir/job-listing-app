const BASE_URL = "http://localhost:5000/jobs"; // Adjust as needed

export const fetchJobs = async (query = "") => {
  const res = await fetch(`${BASE_URL}?${query}`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return await res.json();
};


export const addJob = async (job) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return res.json();
};

export const updateJob = async (id, job) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return res.json();
};

export const deleteJob = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
