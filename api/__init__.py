import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

dotenv_path = os.path.join(os.path.dirname(__file__), ".", ".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
else:
    raise FileNotFoundError(".env file not found")

app = Flask(__name__)
cors = CORS(app)
pg_user = os.environ.get("PG_USER")
pg_pass = os.environ.get("PG_PASS")
pg_host = os.environ.get("PG_HOST")
db_name = os.environ.get("DB_NAME")
app.config["SECRET_KEY"] = os.environ.get("API_SECRET")
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{pg_user}:{pg_pass}@{pg_host}/{db_name}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app, session_options={"autoflush": False})
from api.models import *
with app.app_context():
    db.create_all()

api = Api(app)
migrate = Migrate(app, db)

from api.resources.users import UserResource, UserListResource
api.add_resource(UserResource, "/api/users/<int:user_id>")
api.add_resource(UserListResource, "/api/users")

from api.resources.libraries import LibraryResource, LibraryListResource
api.add_resource(LibraryResource, "/api/libraries/<int:library_id>")
api.add_resource(LibraryListResource, "/api/libraries")

from api.resources.documents import DocumentResource, DocumentListResource
api.add_resource(DocumentResource, "/api/documents/<int:document_id>")
api.add_resource(DocumentListResource, "/api/documents")

from api.resources.articles import ArticleResource, ArticleListResource
api.add_resource(ArticleResource, "/api/articles/<int:article_id>")
api.add_resource(ArticleListResource, "/api/articles")


from api import controllers
