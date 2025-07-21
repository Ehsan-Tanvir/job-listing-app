from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from datetime import datetime, timedelta
import time
import requests
import re

#just for date parse
def parse_posted_text(text):
    try:
        text = text.strip().lower()

        # Matches '3 days ago', '1 day ago', '5d ago'
        match = re.search(r'(\d+)\s*d(?:ays)?\s*ago', text)
        if match:
            days = int(match.group(1))
            return (datetime.utcnow() - timedelta(days=days)).strftime('%Y-%m-%d')

        # Matches 'posted on July 14, 2025'
        if 'posted on' in text:
            date_str = text.replace('posted on', '').strip().title()
            return datetime.strptime(date_str, "%B %d, %Y").strftime('%Y-%m-%d')

        # Fallback: today
        return datetime.utcnow().strftime('%Y-%m-%d')

    except Exception as e:
        print(f"Error parsing date: {e}")
        return datetime.utcnow().strftime('%Y-%m-%d')


options = Options()
options.add_argument("--headless=new")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-gpu")

driver = webdriver.Chrome(
    service=Service("/usr/local/bin/chromedriver"),
    options=options
)

driver.get("https://www.actuarylist.com")
time.sleep(3)  

jobs = [
    card for card in driver.find_elements(By.CLASS_NAME, "Job_job-card__YgDAV")
    if "Job_job-card-pinned__cHEWo" not in card.get_attribute("class")
]

print(f"Found {len(jobs)} job tiles.")


for job in jobs:
    print("Scraping job...")

    try:
        title = job.find_element(By.CLASS_NAME, "Job_job-card__position__ic1rc").text
        company = job.find_element(By.CLASS_NAME, "Job_job-card__company__7T9qY").text
        location = job.find_element(By.CLASS_NAME, "Job_job-card__locations__x1exr").text
        raw_posting_date = job.find_element(By.CLASS_NAME, "Job_job-card__posted-on__NCZaJ").text
        posting_date= parse_posted_text(raw_posting_date)
        job_type = "Full-Time" 

        payload = {
            "title": title,
            "company": company,
            "location": location,
            "posting_date": posting_date, 
            "job_type": job_type,
        }

        response = requests.post("http://localhost:5000/jobs", json=payload)
        print(f"Inserted: {title} ({response.status_code})")

    except Exception as e:
        print("Error scraping a job:", e)

# Close browser
driver.quit()