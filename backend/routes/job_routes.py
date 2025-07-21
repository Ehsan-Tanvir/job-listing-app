from flask import Blueprint, request, jsonify
from models.job import Job
from db import db
from datetime import datetime

job_routes = Blueprint('job_routes', __name__)


#INSERT
@job_routes.route('/jobs', methods=['POST'])
def create_job():
    data = request.get_json()
    required_fields = ['title', 'company', 'location']
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    job = Job(
        title=data['title'],
        company=data['company'],
        location=data['location'],
        posting_date=datetime.strptime(data['posting_date'], '%Y-%m-%d') if 'posting_date' in data else datetime.utcnow(),
        job_type=data.get('job_type'),
    )
    db.session.add(job)
    db.session.commit()
    return jsonify(job.to_dict()), 201


#GET ALL
@job_routes.route('/jobs', methods=['GET'])
def get_jobs():
    query = Job.query
    if 'job_type' in request.args:
        query = query.filter_by(job_type=request.args['job_type'])
    if 'location' in request.args:
        query = query.filter(Job.location.ilike(f"%{request.args['location']}%"))
    if 'sort' in request.args:
        if request.args['sort'] == 'desc':
            query = query.order_by(Job.posting_date.desc())
        elif request.args['sort'] == 'asc':
            query = query.order_by(Job.posting_date.asc())
    else:
        query = query.order_by(Job.posting_date.desc())
    jobs = query.all()
    return jsonify([job.to_dict() for job in jobs])


#FIND
@job_routes.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify(job.to_dict())


#UPDATE
@job_routes.route('/jobs/<int:job_id>', methods=['PUT', 'PATCH'])
def update_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    data = request.get_json()
    for field in ['title', 'company', 'location', 'posting_date', 'job_type']:
        if field in data:
            if field == 'posting_date':
                setattr(job, field, datetime.strptime(data[field], '%Y-%m-%d'))
            elif field == 'tags':
                setattr(job, field, ','.join(data[field]))
            else:
                setattr(job, field, data[field])
    db.session.commit()
    return jsonify(job.to_dict())


#DELETE
@job_routes.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted"})
