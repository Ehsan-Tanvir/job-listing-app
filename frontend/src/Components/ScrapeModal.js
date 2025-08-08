import React, { useState } from "react";
import "../index.css";

const ScrapeModal = ({ isOpen, onClose, onScrape }) => {
  const [numPages, setNumPages] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose(); // Immediately close modal
    await onScrape(numPages);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Scrape Jobs</h3>
        <p>Select how many pages of jobs you want to scrape.</p>

        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <label htmlFor="numPages">
            <strong>Pages:</strong>
          </label>
          <select
            id="numPages"
            value={numPages}
            onChange={(e) => setNumPages(parseInt(e.target.value))}
            style={{
              marginLeft: "10px",
              padding: "0.4rem",
              borderRadius: "4px",
            }}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <div style={{ marginTop: "1.5rem" }}>
            <button type="submit" className="btn-scrape">
              Scrape
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScrapeModal;
