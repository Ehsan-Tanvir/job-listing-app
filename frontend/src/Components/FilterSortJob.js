import React, { useState } from "react";
import Select from "react-select";

const FilterSortJob = ({ onFilter }) => {
  const defaultFilters = {
    job_type: "",
    company: "",
    country: "",
    sort: "",
    tags: [],
  };

  const [filters, setFilters] = useState(defaultFilters);

  const tagOptions = [
    { value: "Analyst (Experienced)", label: "Analyst (Experienced)" },
    { value: "Actuary (Associate)", label: "Actuary (Associate)" },
    { value: "Life", label: "Life" },
    { value: "Health", label: "Health" },
    { value: "Reinsurance", label: "Reinsurance" },
    { value: "Risk", label: "Risk" },
    { value: "Systems", label: "Systems" },
    { value: "Modelling", label: "Modelling" },
    { value: "Coding", label: "Coding" },
    { value: "Pricing", label: "Pricing" },
    { value: "MoSes", label: "MoSes" },
    { value: "Valuation", label: "Valuation" },
    { value: "Longevity", label: "Longevity" },
    { value: "Microsoft Excel", label: "Microsoft Excel" },
    { value: "SQL", label: "SQL" },
    { value: "R", label: "R" },
    { value: "Tableau", label: "Tableau" },
    { value: "SAS", label: "SAS" },
    { value: "AXIS", label: "AXIS" },
  ];

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    let newValue;

    if (name === "tags") {
      newValue = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          newValue.push(options[i].value);
        }
      }
    } else {
      newValue = value;
    }

    const newFilters = { ...filters, [name]: newValue };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="company"
        placeholder="Company..."
        value={filters.company}
        onChange={handleChange}
      />

      <input
        type="text"
        name="country"
        placeholder="Country..."
        value={filters.country}
        onChange={handleChange}
      />

      <select name="job_type" value={filters.job_type} onChange={handleChange}>
        <option value="">All Types</option>
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Intern</option>
      </select>

      <Select
        name="tags"
        isMulti
        options={tagOptions}
        value={tagOptions.filter((option) =>
          filters.tags.includes(option.value),
        )}
        onChange={(selectedOptions) => {
          const selectedValues = selectedOptions.map((option) => option.value);
          const newFilters = { ...filters, tags: selectedValues };
          setFilters(newFilters);
          onFilter(newFilters);
        }}
        placeholder="Select tags..."
      />

      <select name="sort" value={filters.sort} onChange={handleChange}>
        <option value="">Sort by Date</option>
        <option value="posted_date_desc">Newest First</option>
        <option value="posted_date_asc">Oldest First</option>
      </select>

      <button className="btn-reset" onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSortJob;
