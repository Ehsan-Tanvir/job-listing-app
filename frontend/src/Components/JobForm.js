import React, { useState, useEffect } from "react";

const JobForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    posting_date: "",
    job_type: "",
    ...initialData,
  });

  useEffect(() => {
    setForm({
      title: "",
      company: "",
      location: "",
      posting_date: "",
      job_type: "",
      tags: "",
      ...initialData,
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input type="date" name="posting_date" value={form.posting_date} onChange={handleChange} required />
      <select name="job_type" value={form.job_type} onChange={handleChange} required>
        <option value="">Select type</option>
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Internship</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobForm;
