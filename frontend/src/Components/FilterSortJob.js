import React, { useState } from "react";

const FilterSortJob = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    job_type: "",
    location: "",
    sort: "",
  });

  const handleChange = (e) => {
  const newFilters = { ...filters, [e.target.name]: e.target.value };
  setFilters(newFilters);
  onFilter(newFilters);
};

  return (
    <div className="filter-bar">

      <input
        type="text"
        name="location"
        placeholder="Location..."
        value={filters.location}
        onChange={handleChange}
      />

      <select name="job_type" value={filters.job_type} onChange={handleChange}>
        <option value="">All Types</option>
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Internship</option>
      </select>

      <select name="sort" value={filters.sort} onChange={handleChange}>
        <option value="">Sort by Date</option>
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </div>
  );
};

export default FilterSortJob;
