import datetime
import enum
from api import db
from api.models.iso8601_serializer_mixin import ISO8601SerializerMixin


class Roles(enum.IntEnum):
    NO_ROLE = 0
    AUTHORIZED = 1
    LOW = 2
    MID = 3
    HIGH = 4
    CREATOR = 5


class AdminRoles(enum.IntEnum):
    NO_ROLE = 0
    AUTHORIZED = 1
    ADMIN = 2


class User(db.Model, ISO8601SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(64), nullable=False, index=False, unique=False)
    confirmed = db.Column(db.Boolean(), nullable=True, index=False, default=False)
    username = db.Column(db.String(64), nullable=False, index=True, unique=True)
    password = db.Column(db.String(), nullable=False)
    created_on = db.Column(db.DateTime(), default=datetime.datetime.utcnow)

    role = db.Column(db.Integer(), default=AdminRoles.NO_ROLE.value)

    libraries = db.relationship("UsersToLibraries", back_populates="user")
    documents = db.relationship("Document", back_populates="author")
    articles = db.relationship("Article", back_populates="author")
    # : Mapped[list["UsersToDocuments"]] = relationship(back_populates="user")
    # libraries = db.relationship("Library", secondary="users_to_libraries", back_populates="users")

    token = db.Column(db.String(), unique=True, index=True)
    token_expiration = db.Column(db.DateTime())

    def to_dict(self, *args, **kwargs):
        if "only" in kwargs:
            return super(User, self).to_dict(*args, **kwargs)
        response = super(User, self).to_dict(*args, **kwargs, only=["id", "username", "first_name", "last_name",
                                                                "created_on", "role"])
        response["libraries"] = [(association.library.id, association.library.to_dict(), association.role) for association in self.libraries]
        return response
