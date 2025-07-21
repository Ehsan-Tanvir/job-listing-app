from db import app
from routes.job_routes import job_routes
from flask_cors import CORS

app.register_blueprint(job_routes)

if __name__ == '__main__':
    CORS(app)
    from db import db
    with app.app_context():
        db.create_all()
    app.run(debug=True)