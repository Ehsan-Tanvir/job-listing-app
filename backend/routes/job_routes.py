from flask import Blueprint, request, jsonify
from models.job import Job
from db import db
from datetime import datetime
import subprocess
from sqlalchemy import desc, asc

job_routes = Blueprint("job_routes", __name__)


# VALIDATE
def validate_job_data(data):
    required_fields = {
        "title": str,
        "company": str,
        "country": str,
        "city": str,
        "posted_date": str,
        "job_type": str,
        "tags": list,
        "link": str,
    }

    for field, expected_type in required_fields.items():
        if field not in data:
            return f"Missing required field: {field}"
        if not isinstance(data[field], expected_type):
            return (
                f"Invalid type for field '{field}': expected {expected_type.__name__}"
            )

    # Check date format
    try:
        datetime.strptime(data["posted_date"], "%Y-%m-%d")
    except ValueError:
        return "Invalid date format for 'posted_date'. Use YYYY-MM-DD."

    return None


# CREATE
@job_routes.route("/jobs", methods=["POST"])
def create_jobs():
    data = request.get_json()

    if not isinstance(data, list):
        return jsonify({"error": "Expected a list of job objects"}), 400

    jobs_added = []

    for job_data in data:
        error = validate_job_data(job_data)
        if error:
            return jsonify({"error": error}), 400

        # Check for duplicates based on title, company, and link
        exists = Job.query.filter_by(
            title=job_data["title"], company=job_data["company"], link=job_data["link"]
        ).first()

        if exists:
            continue  # Skip duplicates

        job = Job(
            title=job_data["title"],
            company=job_data["company"],
            country=job_data["country"],
            city=job_data["city"],
            posted_date=datetime.strptime(job_data["posted_date"], "%Y-%m-%d").date(),
            job_type=job_data["job_type"],
            tags=job_data["tags"],
            link=job_data["link"],
        )

        db.session.add(job)
        jobs_added.append(job)

    if jobs_added:
        db.session.commit()

    return jsonify([job.to_dict() for job in jobs_added]), 201


# READ ALL WITH FILTERING & SORTING
@job_routes.route("/jobs", methods=["GET"])
def list_jobs():
    query = Job.query

    # Filtering
    job_type = request.args.get("job_type")
    country = request.args.get("country")
    city = request.args.get("city")
    tags = request.args.get("tags")

    if job_type:
        query = query.filter_by(job_type=job_type)
    if country:
        query = query.filter_by(country=country)
    if city:
        query = query.filter_by(city=city)
    if tags:
        tag_list = [tag.strip() for tag in tags.split(",")]
        for tag in tag_list:
            query = query.filter(Job.tags.any(tag))

    # Sorting
    sort_param = request.args.get("sort", "posted_date_desc")
    if sort_param == "posted_date_asc":
        query = query.order_by(asc(Job.posted_date))
    else:
        query = query.order_by(desc(Job.posted_date))

    jobs = query.all()
    return jsonify([job.to_dict() for job in jobs])


# READ SINGLE
@job_routes.route("/jobs/<int:id>", methods=["GET"])
def get_job(id):
    job = Job.query.get(id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify(job.to_dict()), 200


# UPDATE
@job_routes.route("/jobs/<int:id>", methods=["PUT", "PATCH"])
def update_job(id):
    job = Job.query.get(id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    data = request.get_json()
    allowed_fields = [
        "title",
        "company",
        "country",
        "city",
        "posted_date",
        "job_type",
        "tags",
        "link",
    ]
    error = validate_job_data({**job.to_dict(), **data})
    if error:
        return jsonify({"error": error}), 400

    for field in allowed_fields:
        if field in data:
            if field == "posted_date":
                job.posted_date = datetime.strptime(
                    data["posted_date"], "%Y-%m-%d"
                ).date()
            else:
                setattr(job, field, data[field])

    db.session.commit()
    return jsonify(job.to_dict()), 200


# DELETE
@job_routes.route("/jobs/<int:id>", methods=["DELETE"])
def delete_job(id):
    job = Job.query.get(id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted"}), 200


# SCRAPER
@job_routes.route("/scrape", methods=["POST"])
def run_scraper():
    try:
        # Get number of pages from request JSON
        data = request.get_json()
        num_pages = str(data.get("num_pages", 1))

        # Run the scraper with number of pages as argument
        result = subprocess.run(
            ["python3", "scraper/scrape.py", num_pages], capture_output=True, text=True
        )

        if result.returncode == 0:
            return (
                jsonify(
                    {"message": "Scraper ran successfully.", "output": result.stdout}
                ),
                200,
            )
        else:
            return jsonify({"error": "Scraper failed.", "stderr": result.stderr}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
