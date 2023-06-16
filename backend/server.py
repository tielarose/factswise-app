"""Server for factswise app."""

from flask import Flask, jsonify, request
from random import choice
from model import connect_to_db, db, Educator, Classroom, Student

app = Flask(__name__)


@app.route("/api/educator/lookup-educator-id", methods=["POST"])
def lookup_educator_id():
    """Given an email address, check if there is an educator account associated with that email address. If so, return the associated educator_id."""

    email_entered = request.json.get("email_entered")
    educator = Educator.get_by_email(email_entered)

    if not educator:
        return jsonify({"educator_id": None})
    else:
        return jsonify({"educator_id": educator.educator_id})


@app.route("/api/educator/verify-educator-password", methods=["POST"])
def verify_educator_password():
    """Given an educator_id and entered password, verify the entered password matches the user's password stored in the database."""

    educator_id = request.json.get("educator_id")
    entered_password = request.json.get("entered_password")

    educator = Educator.get_by_id(educator_id)

    if educator.educator_password == entered_password:
        return jsonify(
            {
                "login_successful": True,
                "is_student": False,
                "is_educator": True,
                "user_info": educator.to_dict(),
            }
        )

    return jsonify({"login_successful": False})


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
        return jsonify({"signup_successful": False})
    else:
        return jsonify(
            {
                "signup_successful": True,
                "user_info": educator.to_dict(),
                "is_educator": is_educator(educator.educator_id),
            }
        )


@app.route("/api/educator/new/student", methods=["POST"])
def create_new_student():
    """Create a new student in the given classroom."""

    student_first_name = request.json.get("student_first_name")
    student_last_name = request.json.get("student_last_name")
    student_grade_level = request.json.get("student_grade_level")
    student_password = request.json.get("student_password")
    current_problem_set = request.json.get("current_problem_set")
    classroom_id = request.json.get("classroom_id")
    student_login_icon = request.json.get("student_login_icon")

    new_student = Student.create(
        student_first_name=student_first_name,
        student_last_name=student_last_name,
        student_grade_level=student_grade_level,
        student_password=student_password,
        current_problem_set=current_problem_set,
        classroom_id=classroom_id,
        student_login_icon=student_login_icon,
    )

    db.session.add(new_student)
    db.session.commit()

    # how do I get the student I just added? first name and last name and class code maybe?
    return jsonify({"added": "a student"})


@app.route("/api/educator/new/classroom", methods=["POST"])
def create_new_classroom():
    """Create a new classroom for the given educator."""

    educator_id = request.json.get("educator_id")
    educator_last_name = request.json.get("educator_last_name")
    classroom_name = request.json.get("classroom_name")
    classroom_code = f"{educator_last_name[:3]}{choice(range(100,999))}"

    new_classroom = Classroom.create(
        educator_id=educator_id,
        classroom_code=classroom_code,
        classroom_name=classroom_name,
    )

    db.session.add(new_classroom)
    db.session.commit()

    return jsonify({"added": "a classroom"})


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


@app.route("/api/student/get-classroom-by-code", methods=["POST"])
def get_classroom_by_code():
    """Check if a classroom exists for the entered classroom code. If so, return the teacher display name and a list all students (full names, student_ids) for the given classroom."""

    entered_classroom_code = request.json.get("entered_classroom_code")
    classroom = Classroom.get_by_classroom_code(entered_classroom_code)

    if classroom:
        students = [
            {
                "student_first_name": student.student_first_name,
                "student_last_name": student.student_last_name,
                "student_id": student.student_id,
            }
            for student in classroom.students
        ]
        classroom_dict = classroom.to_dict()
        classroom_dict[
            "educator_display_name"
        ] = classroom.educator.educator_display_name
        return jsonify(
            {"classroom_found": True, "classroom": classroom_dict, "students": students}
        )
    else:
        return jsonify({"classroom_found": False})


@app.route("/api/student/verify-student-password", methods=["POST"])
def verify_student_password():
    """Given a student_id and an entered password, verify the entered password matches the user's password stores in the database."""

    student_id = request.json.get("student_id")
    entered_password = request.json.get("entered_password")

    student = Student.get_by_id(student_id)

    if student.student_password == entered_password:
        return jsonify(
            {
                "login_successful": True,
                "is_student": True,
                "is_educator": False,
                "user_info": student.to_dict(),
            }
        )

    return jsonify({"login_successful": False})


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
