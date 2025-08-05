from db import db
from datetime import date
from sqlalchemy.dialects.postgresql import ARRAY


class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    posted_date = db.Column(db.Date, nullable=False, default=date.today)
    job_type = db.Column(db.String(50), nullable=False)
    tags = db.Column(ARRAY(db.String), nullable=False)
    link = db.Column(db.String(500), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "country": self.country,
            "city": self.city,
            "posted_date": self.posted_date.strftime("%Y-%m-%d"),
            "job_type": self.job_type,
            "tags": self.tags,
            "link": self.link,
        }


# Using PostgreSQL ARRAY for tags: simple, fast, and avoids joins.
# If complex filtering or DB-agnostic support is needed, switch to a many-to-many Tag model.

# Job Model Schema Design
#
# This schema represents a job posting. It includes core job details like title, company, location (country and city),
# date posted, job type, link and a list of tags. The `tags` field uses PostgreSQL's ARRAY data type to store multiple
# tags directly in the row — this offers fast read access and simplifies the schema in early stages.
#
# Design Choices:
# - `posted_date`: stored as a Date for proper filtering/sorting and to avoid manual parsing.
# - `link`: included to uniquely identify job listings and prevent duplicates.
# - `tags`: stored as ARRAY(db.String) — ideal for PostgreSQL and early-phase apps. If filtering by tags becomes
#   complex or DB portability is required, this can be refactored into a many-to-many relationship.
#
# Overall, this design prioritizes simplicity, performance, and clean API serialization via `to_dict()`.
