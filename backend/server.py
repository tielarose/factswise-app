"""Server for factswise app."""

from functools import reduce
from flask import Flask, jsonify, request
from sqlalchemy import func, cast
import sqlalchemy
from random import choice, shuffle
from datetime import datetime
from model import (
    connect_to_db,
    db,
    Educator,
    Classroom,
    Student,
    ProblemSet,
    ProblemSetType,
    ProblemSetQuestion,
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
        orig_classrooms_list = educator.classrooms
        orig_classrooms_list.reverse()
        classrooms = [classroom.to_dict() for classroom in orig_classrooms_list]
        return jsonify({"classrooms_found": True, "classrooms": classrooms})
    else:
        return jsonify({"classrooms_found": False})


@app.route("/api/educator/classroom-info/<classroom_id>")
def get_classroom_info(classroom_id):
    """Given a classroom_id, return a list of students in that classroom and their latest assessment information."""

    classroom = Classroom.get_by_id(classroom_id)
    student_objects = classroom.students

    def latest_assessment(student_id):
        "Given a student, get their most recent assessment data"

        latest_assessment = db.session.execute(
            db.select(
                ProblemSetQuestionAnswer.date_assessed,
                ProblemSetType.problem_set_type_name,
                ProblemSet.problem_set_level,
                func.sum(cast(ProblemSetQuestionAnswer.is_correct, sqlalchemy.Integer)),
                func.count(ProblemSetQuestionAnswer.student_answer),
                func.avg(ProblemSetQuestionAnswer.time_to_answer),
            )
            .select_from(ProblemSetQuestionAnswer)
            .join(ProblemSetQuestion)
            .join(ProblemSet)
            .join(ProblemSetType)
            .filter(ProblemSetQuestionAnswer.student_id == student_id)
            .group_by(ProblemSetQuestionAnswer.date_assessed)
            .group_by(ProblemSetType.problem_set_type_name)
            .group_by(ProblemSet.problem_set_level)
            # .group_by(ProblemSetQuestion.problem_set_id)
            .order_by(ProblemSetQuestionAnswer.date_assessed.desc())
        ).first()

        if latest_assessment != None:
            date, problem_set_type, level, num_correct, total, time = latest_assessment
            percent_as_int = round((num_correct / total) * 100)

            return {
                "date": date,
                "problem_set_type": problem_set_type,
                "level": level,
                "num_correct": num_correct,
                "total": total,
                "avg_time": round(time),
                "percent_as_int": percent_as_int,
            }
        else:
            return {
                "date": None,
                "problem_set_type": None,
                "level": None,
                "num_correct": None,
                "total": None,
                "avg_time": None,
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
    # assessments_tuples = db.session.execute(
    #     db.select(
    #         ProblemSetQuestionAnswer.date_assessed,
    #         func.sum(cast(ProblemSetQuestionAnswer.is_correct, sqlalchemy.Integer)),
    #         func.count(ProblemSetQuestionAnswer.student_answer),
    #     )
    #     .filter_by(student_id=student_id)
    #     .group_by(ProblemSetQuestionAnswer.date_assessed)
    #     .order_by(ProblemSetQuestionAnswer.date_assessed.desc())
    # ).all()

    all_assessments_tuples = db.session.execute(
        db.select(
            ProblemSetQuestionAnswer.date_assessed,
            ProblemSetType.problem_set_type_name,
            ProblemSet.problem_set_level,
            func.sum(cast(ProblemSetQuestionAnswer.is_correct, sqlalchemy.Integer)),
            func.count(ProblemSetQuestionAnswer.student_answer),
            func.avg(ProblemSetQuestionAnswer.time_to_answer),
        )
        .select_from(ProblemSetQuestionAnswer)
        .join(ProblemSetQuestion)
        .join(ProblemSet)
        .join(ProblemSetType)
        .filter(ProblemSetQuestionAnswer.student_id == student_id)
        .group_by(ProblemSetQuestionAnswer.date_assessed)
        .group_by(ProblemSetType.problem_set_type_name)
        .group_by(ProblemSet.problem_set_level)
        .order_by(ProblemSetQuestionAnswer.date_assessed.desc())
    ).all()

    def assessment_tuples_into_dict(assessment_tuple):
        date, problem_set_type, level, num_correct, total, time = assessment_tuple
        percent_as_int = round((num_correct / total) * 100)

        return {
            "date": date,
            "problem_set_type": problem_set_type,
            "level": level,
            "num_correct": num_correct,
            "total": total,
            "avg_time": round(time),
            "percent_as_int": percent_as_int,
        }

    assessments_list = [
        assessment_tuples_into_dict(assessment) for assessment in all_assessments_tuples
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


@app.route("/api/problem-set-info/<problem_set_id>")
def get_problem_set_info(problem_set_id):
    """Given a problem_set_id, return the ____ on that problem set."""

    problem_set_info = db.session.execute(
        db.select(
            ProblemSet.problem_set_description,
            ProblemSet.problem_set_level,
            ProblemSetType.problem_set_type_name,
        )
        .filter_by(problem_set_id=problem_set_id)
        .join(ProblemSetType)
    ).first()

    problem_set_name, problem_set_level, problem_set_type = problem_set_info

    return jsonify(
        {
            "problem_set_name": problem_set_name,
            "problem_set_level": problem_set_level,
            "problem_set_type": problem_set_type,
        }
    )


@app.route("/api/problem-set-questions/<problem_set_id>")
def get_all_problem_set_questions(problem_set_id):
    """Given a problem_set_id, return a list of all questions (with answers) in that problem set."""

    # query the database for all problem set questions in the given problem set
    problem_set_questions = db.session.execute(
        db.select(
            ProblemSetQuestion.problem_set_question_id,
            ProblemSetQuestion.question_text,
            ProblemSetQuestion.answer_as_int,
        ).filter_by(problem_set_id=problem_set_id)
    ).all()

    # randomize the order of the problem set questions
    shuffle(problem_set_questions)

    # create a function to return a json serializable dictionary for each problem set question
    def problem_set_tuple_to_dict(problem_set_tuple):
        problem_set_question_id, question_text, answer_as_int = problem_set_tuple

        return {
            "question_id": problem_set_question_id,
            "question_text": question_text,
            "answer_as_int": answer_as_int,
        }

    problem_set_questions_as_dicts = [
        problem_set_tuple_to_dict(problem_set_question)
        for problem_set_question in problem_set_questions
    ]

    return jsonify({"problem_set_questions": problem_set_questions_as_dicts})


@app.route("/api/student/submitanswers", methods=["POST"])
def submit_student_answers():
    """Given an array of student answer inputs, create ProblemSetQuestionAnswer entries for each."""

    student_id = request.json.get("student_id")
    date_assessed = datetime.now()
    all_answers = request.json.get("all_answers")

    # print(all_answers)

    for answer in all_answers:
        new_answer = ProblemSetQuestionAnswer.create(
            student_id=student_id,
            problem_set_question_id=answer["problem_set_question_id"],
            student_answer=answer["student_answer"],
            is_correct=answer["is_correct"],
            time_to_answer=answer["time_to_answer"],
            date_assessed=date_assessed,
        )

        db.session.add(new_answer)
        db.session.commit()

    return jsonify({"it was all": "submitted!"})


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
