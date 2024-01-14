from api import db
from api.models.iso8601_serializer_mixin import ISO8601SerializerMixin


class Article(db.Model, ISO8601SerializerMixin):
    __tablename__ = "articles"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    order_num = db.Column(db.Integer(), default=0)
    article_type = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(128), nullable=False)
    content = db.Column(db.String(1024), nullable=False)

    author_id = db.Column(db.Integer(), db.ForeignKey("users.id"))
    author = db.relationship("User", back_populates="articles")
    document_id = db.Column(db.Integer(), db.ForeignKey("documents.id"))
    document = db.relationship("Document", back_populates="articles")

    def to_dict(self, *args, **kwargs):
        if "only" in kwargs:
            return super(Article, self).to_dict(*args, **kwargs)
        response = super(Article, self).to_dict(*args, **kwargs, only=["id", "order_num", "article_type", "name",
                                                                       "content", "author_id", "document_id"
                                                                       ])
        return response
