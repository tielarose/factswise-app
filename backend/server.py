"""Server for factswise app."""

from flask import Flask, jsonify
# from model import Educator
from model import connect_to_db, db, Educator, Classroom

app = Flask(__name__)

@app.route("/api/educator/login/<educator_email>")
def check_if_educator_in_database(educator_email):
    """Check if an educator exists for the given email. If so, return that educator."""

    print("*" * 20)
    print("educator/login/email route was visited")
    educator = Educator.get_by_email(educator_email)

    if not educator:
        return jsonify({"educator_email": educator_email, "educator_id": None})
    else:
        return jsonify(educator.to_dict())

@app.route("/api/student/login/<classroom_code>")
def check_if_classroom_code_in_database(classroom_code):
    """Check if a classroom exists for the given code. If so, return the teacher display name and a list of all students for that classroom."""

    print("*" * 20)
    print("educator/login/email route was visited")
    classroom = Classroom.get_by_classroom_code(classroom_code);

    if classroom:
        students = [student.to_dict() for student in classroom.students];
        return jsonify({"classroom": classroom.to_dict(), "students": students})
    else:
        return jsonify({"classroom": {"classroom_code": None}})

if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)