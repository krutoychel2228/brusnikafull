import string
import random

from flask import g
from flask_restful import abort
from werkzeug.security import generate_password_hash

from api import db
from api.models import User

from api.models.users import Roles
from api.services.auth import get_token


def abort_if_user_not_found(func):
    def new_func(user_id, *args, **kwargs):
        user = db.session.query(User).get(user_id)
        if not user:
            abort(404, success=False, message=f"User {user_id} not found")
        return func(*args, user_id, **kwargs)

    return new_func


def user_access_level(role: Roles):
    def decorator(func):
        def new_func(*args, **kwargs):
            if g.current_user.role < role:
                abort(404, success=False)
            return func(*args, **kwargs)
        return new_func
    return decorator


def get_user(user_id=None, to_dict=True):
    if user_id is not None:
        user = db.session.query(User).get(user_id)
        if user is None:
            return None
        return user.to_dict() if to_dict else user
    return [item.to_dict() if to_dict else item for item in db.session.query(User).all()]


def create_user(email, username, first_name, last_name, role, password):
    if db.session.query(User).filter(User.username == username).first() is not None:
        raise KeyError(f"Пользователь  {username} уже существует")
    user = User()
    user.email = email
    user.username = username
    user.first_name = first_name
    user.last_name = last_name

    user.password = generate_password_hash(password)
    user.role = role
    db.session.add(user)
    db.session.commit()
    token = get_token(user.id)
    expires = user.token_expiration
    return user, token, expires
