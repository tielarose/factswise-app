"""Server for factswise app."""

from flask import Flask, jsonify, request
from model import connect_to_db, db, Educator, Classroom, Student

app = Flask(__name__)


@app.route("/api/educator/login/<educator_email>")
def check_if_educator_in_database(educator_email):
    """Check if an educator exists for the given email. If so, return that educator."""

    educator = Educator.get_by_email(educator_email)

    if not educator:
        return jsonify({"educator_email": educator_email, "educator_id": None})
    else:
        return jsonify(educator.to_dict())


@app.route("/api/educator/login/<educator_email>", methods=["POST"])
def log_in_educator(educator_email):
    """Verify an educator's password and store their educator_id in local storage."""

    educator = Educator.get_by_email(educator_email)
    password_entered = request.json.get("educator_password")

    if educator.educator_password == password_entered:
        print("*" * 40)
        print("password matched!")
        return jsonify(
            {"is_student": False, "is_educator": True, "user_info": educator.to_dict()}
        )

    return jsonify({"educator_id": educator.educator_id, "logged_in": False})


@app.route("/api/educator/signup", methods=["POST"])
def add_educator_to_db():
    """Create a new educator from form input."""

    educator_email = request.json.get("educator_email")
    educator_first_name = request.json.get("educator_first_name")
    educator_last_name = request.json.get("educator_last_name")
    educator_display_name = request.json.get("educator_display_name")
    educator_password = request.json.get("educator_password")

    new_educator = Educator.create(
        educator_email=educator_email,
        educator_first_name=educator_first_name,
        educator_last_name=educator_last_name,
        educator_display_name=educator_display_name,
        educator_password=educator_password,
    )

    db.session.add(new_educator)
    db.session.commit()

    educator = Educator.get_by_email(educator_email)

    if not educator:
        return jsonify({"user_id": None})
    else:
        return jsonify({"user_id": educator.educator_id})


@app.route("/api/educator/<educator_id>/classrooms")
def get_educator_classrooms(educator_id):
    """Given an educator_id, return a list of that educator's classrooms."""

    educator = Educator.get_by_id(educator_id)
    classrooms = [classroom.to_dict() for classroom in educator.classrooms]

    return jsonify({"classrooms": classrooms})


@app.route("/api/educator/classroom_info/<classroom_id>")
def get_classroom_info(classroom_id):
    """Given a classroom_id, return a list of students in that classroom."""

    print("&" * 40)
    print("classroom_id is", classroom_id)

    classroom = Classroom.get_by_id(classroom_id)
    students = [student.to_dict() for student in classroom.students]

    return jsonify({"students": students})


@app.route("/api/student/login/<classroom_code>")
def check_if_classroom_code_in_database(classroom_code):
    """Check if a classroom exists for the given code. If so, return the teacher display name and a list of all students for that classroom."""

    classroom = Classroom.get_by_classroom_code(classroom_code)

    if classroom:
        students = [student.to_dict() for student in classroom.students]
        return jsonify({"classroom": classroom.to_dict(), "students": students})
    else:
        return jsonify({"classroom": {"classroom_code": None}})


@app.route("/api/checkuser", methods=["POST"])
def check_user():
    """Given a user_id, check if they are a student or educator."""

    user_id = request.json.get("user_id")
    print("$" * 40)
    print("checkuser is running, user_id is", user_id)

    if user_id != None:
        if is_student(user_id):
            user_info = Student.get_by_id(user_id).to_dict()
        if is_educator(user_id):
            user_info = Educator.get_by_id(user_id).to_dict()
    else:
        user_info = None

    return jsonify(
        {
            "is_student": is_student(user_id),
            "is_educator": is_educator(user_id),
            "user_info": user_info,
        }
    )


def is_student(user_id):
    """Checks a user's id against the database; returns true if that user is a student."""

    return Student.get_by_id(user_id) != None


def is_educator(user_id):
    """Checks a user's id against the database; returns true if that user is an educator."""

    return Educator.get_by_id(user_id) != None


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
