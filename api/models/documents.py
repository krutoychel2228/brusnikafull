from api import db
from api.models.iso8601_serializer_mixin import ISO8601SerializerMixin
from api.models.users import Roles


class Document(db.Model, ISO8601SerializerMixin):
    __tablename__ = "documents"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    authority_level = db.Column(db.Integer(), default=Roles.NO_ROLE.value)
    author_id = db.Column(db.Integer(), db.ForeignKey("users.id"))
    library_id = db.Column(db.Integer(), db.ForeignKey("libraries.id"))

    author = db.relationship("User", back_populates="documents")
    library = db.relationship("Library", back_populates="documents")
    articles = db.relationship("Article", back_populates="document", order_by="asc(Article.order_num)")

    def to_dict(self, *args, **kwargs):
        if "only" in kwargs:
            return super(Document, self).to_dict(*args, **kwargs)
        response = super(Document, self).to_dict(*args, **kwargs, only=["id", "name", "authority_level", "author_id",
                                                                "library_id"])
        response["articles"] = [association.to_dict() for association in self.articles]
        return response
