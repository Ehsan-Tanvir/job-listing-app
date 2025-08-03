from flask import Flask
from flask_cors import CORS
from config import Config
from db import db
from routes.job_routes import job_routes

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    db.init_app(app)
    app.register_blueprint(job_routes)
    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
