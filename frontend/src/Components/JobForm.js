import React, { useEffect, useState } from "react";

const JobForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    country: "",
    city: "",
    posted_date: "",
    job_type: "",
    tags: "",
    link: "",
  });

  useEffect(() => {
    setForm({
      title: "",
      company: "",
      country: "",
      city: "",
      posted_date: "",
      job_type: "",
      tags: "",
      link: "",
      ...initialData,
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray =
      typeof form.tags === "string"
        ? form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [];

    const finalForm = {
      ...form,
      tags: tagsArray,
    };

    onSubmit(finalForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
        required
      />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="posted_date"
        placeholder="YYYY-MM-DD"
        value={form.posted_date}
        onChange={handleChange}
        required
      />
      <select
        name="job_type"
        value={form.job_type}
        onChange={handleChange}
        required
      >
        <option value="">ALL</option>
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Intern</option>
      </select>
      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        required
      />
      <input
        name="link"
        placeholder="Application Link"
        value={form.link}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn-submit">
        Submit
      </button>
    </form>
  );
};

export default JobForm;
