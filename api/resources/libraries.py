from flask import jsonify
from flask_restful import Resource, abort
from flask_restful.reqparse import RequestParser

from api.services.libraries import get_library, create_library, delete_library


class LibraryResource(Resource):
    def get(self, library_id):
        library = get_library(library_id)
        if library is None:
            abort(404, success=False, message=f"Библиотека {library_id} не найдена")
        return jsonify({"success": True, "library": library})

    def delete(self, library_id):
        return delete_library(library_id)


class LibraryListResource(Resource):
    def get(self):
        return jsonify({"success": True, "libraries": get_library()})

    def post(self):
        parser = RequestParser()
        parser.add_argument("name", required=True)
        parser.add_argument("user_id", type=int, required=True)

        kwargs = parser.parse_args(strict=True)
        try:
            library = create_library(**kwargs)
        except KeyError as e:
            return {"success": False, "message": str(e)}, 400
        else:
            return jsonify({"success": True, "library": library.to_dict()})
