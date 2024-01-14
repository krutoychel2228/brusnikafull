from api import db
from api.models.libraries import Library, UsersToLibraries
from api.models.users import User, Roles


def get_library(library_id=None, to_dict=True):
    if library_id is not None:
        library = db.session.query(Library).get(library_id)
        if library is None:
            return None
        return library.to_dict() if to_dict else library
    return [item.to_dict() if to_dict else item for item in db.session.query(Library).all()]


def delete_library(library_id=None):
    if library_id is not None:
        library: Library = db.session.query(Library).get(library_id)
        if library is None:
            return None
        for association in library.users:
            db.session.delete(association)
        for document in library.documents:
            for article in document.articles:
                db.session.delete(article)
            db.session.delete(document)
        db.session.delete(library)
        db.session.commit()
        return {"status": 200, "success": True}
    return {"status": 404, "success": True}, 404


def create_library(name, user_id):
    user: User = db.session.query(User).get(user_id)
    if user is None:
        raise KeyError(f"Создатель библиотеки должен существовать")
    library = Library()
    library.name = name
    user_to_lib = UsersToLibraries()
    user_to_lib.role = Roles.CREATOR.value
    user_to_lib.edit_rights = True
    user_to_lib.library = library
    user_to_lib.user = user
    user.libraries.append(user_to_lib)

    db.session.add(user_to_lib)
    db.session.add(library)
    db.session.commit()
    return library
