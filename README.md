# 💼 Job Listing App

## Overview

**Job Listing App** is a full-stack web application designed to fetch, manage, and display actuarial job listings from [actuarylist.com](https://www.actuarylist.com). The app includes a web scraper, a Flask backend with PostgreSQL, and a responsive React frontend — making it a complete CRUD solution.

This tool is especially helpful for actuaries and job seekers to explore listings with filter and sort options, all in one place.

---

## ✨ Features

* 🔎 **Job Filtering**: Filter by location and job type.
* 🔄 **Sorting**: Sort listings by posting date.
* ➕ **Add Jobs**: Add jobs manually via the frontend.
* 📝 **Edit Jobs**: Inline editing right on the job cards.
* ❌ **Delete Jobs**: One-click job deletion.
* 🔗 **Scraper**: Pulls fresh job listings using Selenium.
* 📦 **Persistent Storage**: Powered by PostgreSQL.
* ⚡ **Responsive UI**: Clean, functional interface with plain CSS.

---

## 🛠️ Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | React (with plain CSS)           |
| Backend  | Flask + SQLAlchemy               |
| Database | PostgreSQL                       |
| Scraper  | Python + Selenium                |
| Misc     | Virtual Environment, RESTful API |

---

## 📁 Abstract Folder Structure

```
job-listing-app/
│
├── backend/           # Flask app and models
│   └── app.py
│
├── scraper/           # Selenium scraper
│   └── scrape.py
│
├── frontend/          # React frontend
│   └── src/
│       ├── components/
│
├── venv/              # Python virtual environment (gitignored)
│
├── requirements.txt   # Python dependencies
├── .gitignore         # Ignores venv, pyc
└── README.md          # You're reading it now
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

### 4. Scrape Job Listings

```bash
python3 scraper/scrape.py
```

This will populate the database with current jobs from actuarylist.com.

---

### 5. Start Frontend

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

* Ensure ChromeDriver matches your Chrome version.
* If using a `.env` file for credentials, make sure it's included in `.gitignore`.
* If you're editing jobs, the same form used for adding is reused dynamically.
* Filtering and sorting are fully dynamic — no full page reloads needed.

---
