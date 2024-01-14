from flask import g, jsonify
from flask_restful.reqparse import RequestParser

from api import app, db
from api.services.auth import basic_auth, get_token, token_auth, revoke_token
from api.models.libraries import Library, UsersToLibraries
from api.models.users import User, Roles
from api.models.articles import Article
from api.formulas import get_vars_list, solve_expr


# app_url = f"http://{os.environ.get('APP_HOST')}:{os.environ.get('APP_PORT')}"


@app.route("/api/users/login", methods=["POST"])
@basic_auth.login_required
# Путь получает в заголовках запроса логин и пароль пользователя (декоратор @basic.auth.login_required)
# и, если данные верны, возвращает токен. Чтобы защитить маршруты API с помощью токенов, необходимо
# добавить декоратор @token_auth.login_required
def log_in():
    token = get_token(g.current_user.id)
    return jsonify({"success": True, "user": g.current_user.to_dict(),
                    "authToken": {"token": token,
                                  "expires": str(g.current_user.token_expiration)}})


@app.route("/api/users/logout", methods=["POST"])
@token_auth.login_required
# Отзыв токена
def log_out():
    revoke_token(g.current_user.id)
    g.current_user = None
    return jsonify({"success": True})


@app.route("/api/users/get-myself")
@token_auth.login_required
def get_myself():
    return {"success": True, "user": g.current_user.to_dict()}


@app.route("/api/libraries/<int:library_id>/add_user/<int:user_id>", methods=["POST"])
def add_user_to_library(library_id, user_id):
    user: User = db.session.query(User).get(user_id)
    if user is None:
        return {"success": False, "message": "User not found"}, 404
    library: Library = db.session.query(Library).get(library_id)
    if library is None:
        return {"success": False, "message": "Library not found"}, 404

    user_to_lib = UsersToLibraries()
    user_to_lib.role = Roles.LOW.value
    user_to_lib.edit_rights = False

    user_to_lib.library = library
    user_to_lib.user = user

    user.libraries.append(user_to_lib)
    db.session.commit()
    return {"success": True, "library": library.to_dict()}


@app.route("/api/articles/<int:article_id>/vars")
def get_formula_vars(article_id):
    article: Article = db.session.query(Article).get(article_id)
    if article is None:
        return {"success": False, "message": "Article not found"}, 404
    if article.article_type.lower() != "formula":
        return {"success": False, "message": "Article type is not 'formula'"}, 400
    return {"success": True, "vars": get_vars_list(article.content)}, 200


@app.route("/api/articles/<int:article_id>/calculate")
def calculate_formula(article_id):
    article: Article = db.session.query(Article).get(article_id)
    if article is None:
        return {"success": False, "message": "Article not found"}, 404
    if article.article_type.lower() != "formula":
        return {"success": False, "message": "Article type is not 'formula'"}, 400

    parser = RequestParser()
    parser.add_argument("vars", type=dict, required=False, default={})

    kwargs = parser.parse_args(strict=True)
    return {"success": True, "result": solve_expr(article.content, kwargs["vars"])}
