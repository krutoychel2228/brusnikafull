from api import db
from api.models.iso8601_serializer_mixin import ISO8601SerializerMixin
from api.models.users import Roles


class UsersToLibraries(db.Model):
    __tablename__ = "users_to_libraries"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))
    document_id = db.Column(db.Integer(), db.ForeignKey("libraries.id"))

    role = db.Column(db.Integer(), default=Roles.NO_ROLE.value)
    edit_rights = db.Column(db.Boolean(), default=False)

    library = db.relationship("Library", back_populates="users")
    user = db.relationship("User", back_populates="libraries")


class Library(db.Model, ISO8601SerializerMixin):
    __tablename__ = "libraries"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    creator_id = db.Column(db.Integer(), db.ForeignKey("users.id"))

    users = db.relationship("UsersToLibraries", back_populates="library")
    creator = db.relationship("User", foreign_keys=[creator_id])
    documents = db.relationship("Document", back_populates="library")

    def to_dict(self, *args, **kwargs):
        if "only" in kwargs:
            return super(Library, self).to_dict(*args, **kwargs)
        response = super(Library, self).to_dict(*args, **kwargs, only=["id", "name"])
        response["users"] = [{"user": user.user.id,
                              "role": user.role,
                              "edit_rights": user.edit_rights} for user
                             in self.users]
        response["documents"] = [doc.to_dict() for doc in self.documents]
        return response
