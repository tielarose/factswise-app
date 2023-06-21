"""Server for factswise app."""

from functools import reduce
from flask import Flask, jsonify, request
from sqlalchemy import func, cast
import sqlalchemy
from random import choice
from model import (
    connect_to_db,
    db,
    Educator,
    Classroom,
    Student,
    ProblemSetQuestionAnswer,
)

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


@app.route("/api/educator/get-all-classrooms", methods=["POST"])
def get_educator_classrooms():
    """Given an educator_id, return a list of that educator's classrooms."""

    educator_id = request.json.get("educator_id")

    educator = Educator.get_by_id(educator_id)

    if educator.classrooms:
        classrooms = [classroom.to_dict() for classroom in educator.classrooms]
        return jsonify({"classrooms_found": True, "classrooms": classrooms})
    else:
        return jsonify({"classrooms_found": False})


@app.route("/api/educator/classroom_info/<classroom_id>")
def get_classroom_info(classroom_id):
    """Given a classroom_id, return a list of students in that classroom and their latest assessment information."""

    classroom = Classroom.get_by_id(classroom_id)
    student_objects = classroom.students

    def latest_assessment(student_id):
        "Given a student, get their most recent assessment data"

        latest_assessment = db.session.execute(
            db.select(
                ProblemSetQuestionAnswer.date_assessed,
                func.sum(cast(ProblemSetQuestionAnswer.is_correct, sqlalchemy.Integer)),
                func.count(ProblemSetQuestionAnswer.student_answer),
            )
            .filter_by(student_id=student_id)
            .group_by(ProblemSetQuestionAnswer.date_assessed)
            .order_by(ProblemSetQuestionAnswer.date_assessed.desc())
        ).first()

        if latest_assessment != None:
            date, num_correct, total = latest_assessment
            percent_as_int = round((num_correct / total) * 100)

            return {
                "date": date,
                "num_correct": num_correct,
                "total": total,
                "percent_as_int": percent_as_int,
            }
        else:
            return {
                "date": None,
                "num_correct": None,
                "total": None,
                "percent_as_int": None,
            }

    students_list = [
        {
            "student_id": student.student_id,
            "student_first_name": student.student_first_name,
            "student_last_name": student.student_last_name,
            "current_problem_set": student.current_problem_set,
            "latest_assessment": latest_assessment(student.student_id),
        }
        for student in classroom.students
    ]

    return jsonify({"students": students_list})


@app.route("/api/educator/studentinfo/<student_id>")
def get_student_info(student_id):
    """Given a student_id, return detailed information on that student."""

    student = Student.get_by_id(student_id)
    assessments_tuples = db.session.execute(
        db.select(
            ProblemSetQuestionAnswer.date_assessed,
            func.sum(cast(ProblemSetQuestionAnswer.is_correct, sqlalchemy.Integer)),
            func.count(ProblemSetQuestionAnswer.student_answer),
        )
        .filter_by(student_id=student_id)
        .group_by(ProblemSetQuestionAnswer.date_assessed)
        .order_by(ProblemSetQuestionAnswer.date_assessed.desc())
    ).all()

    def assessment_tuples_into_dict(assessment_tuple):
        date, num_correct, total = assessment_tuple
        percent_as_int = round((num_correct / total) * 100)

        return {
            "date": date,
            "num_correct": num_correct,
            "total": total,
            "percent_as_int": percent_as_int,
        }

    assessments_list = [
        assessment_tuples_into_dict(assessment) for assessment in assessments_tuples
    ]

    return jsonify({"student_info": student.to_dict(), "assessments": assessments_list})


@app.route("/api/educator/updatestudent", methods=["POST"])
def update_student_info():
    """Given a student_id, update the database with the educator-input information about that student."""

    student_id = request.json.get("student_id")
    new_classroom_id = request.json.get("classroom_id")
    new_login_icon = request.json.get("student_login_icon")
    new_first_name = request.json.get("student_first_name")
    new_last_name = request.json.get("student_last_name")
    new_grade_level = request.json.get("student_grade_level")
    new_problem_set = request.json.get("current_problem_set")

    Student.update_basic_info(
        student_id=student_id,
        new_classroom_id=new_classroom_id,
        new_student_first_name=new_first_name,
        new_student_last_name=new_last_name,
        new_student_grade_level=new_grade_level,
        new_student_login_icon=new_login_icon,
        new_current_problem_set=new_problem_set,
    )

    db.session.commit()

    return jsonify({"response is": "okay"})


@app.route("/api/educator/deletestudent/<student_id>")
def delete_student(student_id):
    """Given a student_id, delete that student from the database."""

    student = Student.get_by_id(student_id)
    db.session.delete(student)
    db.session.commit()

    return jsonify({"student was": "deleted"})


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

    user_id = request.json.get("userId")

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


@app.route("/api/test/<student_id>")
def test_route(student_id):
    assessments = db.session.execute(
        db.select(
            ProblemSetQuestionAnswer.date_assessed,
            func.sum(cast(ProblemSetQuestionAnswer.is_correct, sqlalchemy.Integer)),
            func.count(ProblemSetQuestionAnswer.student_answer),
        )
        .filter_by(student_id=student_id)
        .group_by(ProblemSetQuestionAnswer.date_assessed)
        .order_by(ProblemSetQuestionAnswer.date_assessed.desc())
    ).first()

    print("^" * 40)
    print(assessments)

    return jsonify("test route was visited")


def is_student(user_id):
    """Checks a user's id against the database; returns true if that user is a student."""

    return Student.get_by_id(user_id) != None


def is_educator(user_id):
    """Checks a user's id against the database; returns true if that user is an educator."""

    return Educator.get_by_id(user_id) != None


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
