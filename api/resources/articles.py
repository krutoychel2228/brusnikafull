from flask import jsonify
from flask_restful import Resource, abort
from flask_restful.reqparse import RequestParser

from api.services.articles import get_article, create_article, delete_article


class ArticleResource(Resource):
    def get(self, article_id):
        article = get_article(article_id)
        if article is None:
            abort(404, success=False, message=f"Артикль {article_id} не найден")
        return jsonify({"success": True, "article": article})

    def delete(self, article_id):
        return delete_article(article_id)


class ArticleListResource(Resource):
    def get(self):
        return jsonify({"success": True, "articles": get_article()})

    def post(self):
        parser = RequestParser()
        parser.add_argument("name", required=True)
        parser.add_argument("article_type", required=True)
        parser.add_argument("content", required=True)
        parser.add_argument("user_id", type=int, required=True)
        parser.add_argument("library_id", type=int, required=True)
        parser.add_argument("document_id", type=int, required=True)

        kwargs = parser.parse_args(strict=True)
        try:
            article = create_article(**kwargs)
        except KeyError as e:
            return {"success": False, "message": str(e)}, 400
        else:
            return jsonify({"success": True, "article": article.to_dict()})
