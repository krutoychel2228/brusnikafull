from flask import jsonify
from flask_restful import Resource, abort
from flask_restful.reqparse import RequestParser

from api.services.documents import get_document, create_document, delete_document


class DocumentResource(Resource):
    def get(self, document_id):
        document = get_document(document_id)
        if document is None:
            abort(404, success=False, message=f"Документ {document_id} не найден")
        return jsonify({"success": True, "document": document})

    def delete(self, document_id):
        return delete_document(document_id)


class DocumentListResource(Resource):
    def get(self):
        return jsonify({"success": True, "documents": get_document()})

    def post(self):
        parser = RequestParser()
        parser.add_argument("name", required=True)
        parser.add_argument("authority_level", type=int, required=True)
        parser.add_argument("user_id", type=int, required=True)
        parser.add_argument("library_id", type=int, required=True)

        kwargs = parser.parse_args(strict=True)
        try:
            document = create_document(**kwargs)
        except KeyError as e:
            return {"success": False, "message": str(e)}, 400
        else:
            return jsonify({"success": True, "document": document.to_dict()})
