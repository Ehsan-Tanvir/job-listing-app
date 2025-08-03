import sys, os, time, requests, re
from datetime import datetime, timedelta, timezone
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup


os.environ['PATH'] += r"/usr/local/bin/chromedriver"

num_pages = int(sys.argv[1]) if len(sys.argv) > 1 else 1

options = Options()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)
driver.get("https://www.actuarylist.com/")
driver.implicitly_wait(10)

def remove_emoji(text):
    emoji_pattern = re.compile("[\U0001F1E0-\U0001F1FF]", flags=re.UNICODE)
    return emoji_pattern.sub(r'', text).strip()


def remove_symbolic_emoji(text):
    emoji_pattern = re.compile(r"[\U0001F300-\U0001F5FF\U0001F600-\U0001F6FF]", flags=re.UNICODE)
    return emoji_pattern.sub('', text).strip()

# --- Utility to convert date text into standard format
def parse_posted_text(text):
    try:
        text = text.strip().lower()

        # Matches '3 days ago', '1 day ago', '5d ago'
        match = re.search(r'(\d+)\s*d(?:ays)?\s*ago', text)
        if match:
            days = int(match.group(1))
            return (datetime.now(timezone.utc) - timedelta(days=days)).strftime('%Y-%m-%d')

        # Matches 'posted on July 14, 2025'
        if 'posted on' in text:
            date_str = text.replace('posted on', '').strip().title()
            return datetime.strptime(date_str, "%B %d, %Y").strftime('%Y-%m-%d')

        # Fallback: today
        return datetime.now(timezone.utc).strftime('%Y-%m-%d')

    except Exception as e:
        print(f"Error parsing date: {e}")
        return datetime.now(timezone.utc).strftime('%Y-%m-%d')   


for page in range(num_pages):

    page_jobs = []
 
    print(f"Scraping page {page + 1}")

    # Wait until job section is present
    WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "section.Job_grid-section__kgIsR"))
        )
    
    html = driver.page_source
    soup = BeautifulSoup(html,'lxml')

    job_grid_section = soup.find('section', class_='section Job_grid-section__kgIsR')
    job_cards = job_grid_section.find_all('div', recursive=False)
 
    for job in job_cards:
        try:
            title = job.find('p', class_='Job_job-card__position__ic1rc')
            title = title.text.strip() if title and title.text.strip() else "Actuary" 

            company = job.find('p', class_='Job_job-card__company__7T9qY')
            company = company.text.strip() if company else "N/A"

            country = job.find('a', class_='Job_job-card__country__GRVhK')
            if country:
             country_text = country.text.strip()
             country = remove_emoji(country_text)
            else:
             country = "N/A"

            city = job.find('a', class_='Job_job-card__location__bq7jX')
            if city:
                city_text= city.text.strip()
                city = remove_symbolic_emoji(city_text)
            else:
             city = "N/A"

            posted_date = job.find('p', class_='Job_job-card__posted-on__NCZaJ')
            posted_date = posted_date.text.strip() if posted_date else "N/A"
            posted_date = parse_posted_text(posted_date)

            BASE_URL = "https://www.actuarylist.com"
            link_tag = job.find('a', class_='Job_job-page-link__a5I5g')
            link = BASE_URL + link_tag['href'].strip() if link_tag and 'href' in link_tag.attrs else "N/A"

            tags = job.find('div', class_='Job_job-card__tags__zfriA')
            tags = tags.find_all('a') if tags else []
            tags = [tag.text.strip() for tag in tags]

            if any('intern' in tag.lower() for tag in tags):
                job_type = 'Intern'
            elif any('part-time' in tag.lower() for tag in tags):
                job_type = 'Part-Time'
            elif any('full-time' in tag.lower() for tag in tags):
                job_type = 'Full-Time'
            else:
                job_type = 'Full-Time'

            page_jobs.append({
            "title": title,
            "company":company,
            "country": country,
            "city": city,
            "posted_date": posted_date,
            "job_type": job_type,
            "tags": tags,
            "link":link
        })
        except Exception as e:
            print(f"Skipping job due to error: {e}")
            continue

    # POST Request
    response = requests.post("http://localhost:5000/jobs", json=page_jobs)
    if response.status_code == 201:
     print("Successfully posted jobs to backend.")
    else:
     print(f"Failed to post jobs. Status code: {response.status_code}, Response: {response.text}")
    
    # Click "Next Button"
    if page < num_pages:
        button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable(( By.CSS_SELECTOR,
        "button.bg-white.text-sm.font-semibold.text-gray-900"))
        )
        button.click()
        time.sleep(10)

driver.quit()
