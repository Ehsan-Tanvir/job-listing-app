# 💼 Job Listing App

## Overview

**Job Listing App** is a full-stack web application designed to fetch, manage, and display actuarial job listings from [actuarylist.com](https://www.actuarylist.com). The app includes a web scraper, a Flask backend with PostgreSQL, and a responsive React frontend — making it a complete CRUD solution.

This tool is especially helpful for actuaries and job seekers to explore listings with filter and sort options, all in one place.

---

## ✨ Features

- **Job Filtering**: Filter Jobs by their Company, Country, Type and Tags.
- **Sorting**: Sort Jobs by posting date (Oldest & Newest).
- **Add Jobs**: User can Add a Job.
- **Edit Jobs**: User can Edit any Job.
- **Delete Jobs**: User can Delete any Job.
- **Scraper**: Pulls fresh job listings using Selenium based on user input.
- **Persistent Storage**: PostgreSQL as Database.
- **Responsive UI**: Clean, Functional, Responsive and Dynamic User Inteface.
- **Reset Filters**: Reset all applied filters with a single click of the "Reset Filters" button..
- **More Job Information**: View detailed information about any job by clicking the "More Info" button on its card.
---

## 🛠️ Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | React (with plain CSS)           |
| Backend  | Flask + SQLAlchemy               |
| Database | PostgreSQL                       |
| Scraper  | Python + Selenium + BeautifulSoup|

---

## 📁 Folder Structure

```
job-listing-app/
│
├── backend/                         # Flask backend
│   ├── models/                       # Database models
│   │   └── job.py                     # Job table model
│   │
│   ├── routes/                       # API route handlers
│   │   └── job_routes.py              # Job CRUD routes
│   │
│   ├── app.py                        # Flask app entry
│   ├── config.py                     # App configuration
│   ├── db.py                         # Database setup
│   └── .env                          # Environment variables
│
├── frontend/                         # React frontend
│   └── src/
│       ├── components/               # UI components
│       │   ├── ConfirmDeleteModal.js  # Delete confirm dialog
│       │   ├── FilterSortJob.js       # Filter/sort jobs UI
│       │   ├── JobCard.js             # Single job display
│       │   ├── JobForm.js             # Job form fields
│       │   ├── JobFormModal.js        # Job form popup
│       │   ├── JobList.js             # List of jobs
│       │   └── ScrapeModal.js         # Scraper trigger popup
│       │
│       ├── api.js                    # API calls helper
│       ├── App.js                    # Main React app
│       ├── index.css                 # Global styles
│       └── index.js                  # React entry point
│
├── scraper/                          # Job scraper
│   └── scrape.py                     # Selenium scraping script
│
├── venv/                             # Python virtual env
├── .gitignore                        # Ignore rules
├── README.md                         # Project documentation
└── requirements.txt                  # Python dependencies

```

---

## ⚙️ Setup & Installation

### Prerequisites

* Python 3.10+
* Node.js (v18+ recommended)
* PostgreSQL (ensure it's running locally [pgadmin])
* Git
* Selenium WebDriver (e.g. ChromeDriver installed and added to PATH)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ehsan-Tanvir/job-listing-app.git
cd job-listing-app
```

---

### 2. Setup Python Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

---

### 3. Install Backend Requirements

```bash
pip install -r requirements.txt
```

Make sure PostgreSQL is running and configured correctly in `backend/app.py`:

Create a .env file in the backend/ directory and add the following:

```python
DATABASE_URL = "postgresql://postgres:yourpassword@localhost/joblistings"
```

Then run the backend:

```bash
python3 backend/app.py
```

By default, the backend runs on:
`http://127.0.0.1:5000`

---

### 4. Start Frontend

In another terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs by default on:
`http://localhost:3000`

---

## 📌 Notes

* Just run the app — the database table will be created automatically no manual setup required.
* The /scrape POST endpoint runs the integrated scraper with a specified number of pages and automatically stores the scraped job data into the database (no manual file execution required).
---
