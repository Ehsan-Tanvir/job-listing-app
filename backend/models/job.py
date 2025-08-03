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
            "posted_date": self.posted_date.strftime('%Y-%m-%d'),
            "job_type": self.job_type,
            "tags": self.tags,
            "link": self.link
        }