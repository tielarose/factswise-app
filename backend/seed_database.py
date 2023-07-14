"""Script to seed database."""

import os

import model
import server
import bcrypt
from problem_set_questions_creator import (
    problem_set_seed_data,
    create_mult_div_problem_set_questions,
    create_add_sub_problem_set_questions,
)

from random import choice
from faker import Faker

fake = Faker()

from datetime import datetime, timedelta

os.system("dropdb factswise")
os.system("createdb factswise")

model.connect_to_db(server.app)
model.db.create_all()

# create an educator
educators = []

for _ in range(1):
    # create fake names if needed
    # fname = fake.first_name()
    # lname = fake.last_name()
    # prefix = choice(["Ms.", "Mr.", "Teacher"])

    # for demo purposes, use my name
    fname = "Tiela"
    lname = "Black-Law"
    prefix = "Ms."
    plaintext_pw = "1234"
    bytes_pw = plaintext_pw.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed_pw = bcrypt.hashpw(bytes_pw, salt)

    educator = model.Educator.create(
        educator_first_name=fname,
        educator_last_name=lname,
        educator_display_name=f"{prefix} {choice([fname, lname])}",
        educator_email=f"{fname.lower()}.{lname.lower()}@realschool.org",
        educator_password=hashed_pw,
    )

    educators.append(educator)
    model.db.session.add(educator)

model.db.session.commit()

# create 3 classrooms per educator
classrooms = []

for educator in educators:
    years = ["20-21", "21-22", "22-23"]
    grade_level = choice(["K", "1st"])

    for i in range(3):
        classroom = model.Classroom.create(
            classroom_name=f"{grade_level} {years[i]}",
            classroom_code=f"{educator.educator_last_name[:3]}{choice(range(100,999))}",
            educator_id=educator.educator_id,
        )

        classrooms.append(classroom)
        model.db.session.add(classroom)

model.db.session.commit()

# create both problem set types (no custom problem sets yet)
problem_set_types = []

add_sub = model.ProblemSetType.create(problem_set_type_name="Addition Subtraction")
problem_set_types.append(add_sub)
model.db.session.add(add_sub)

mult_div = model.ProblemSetType.create(problem_set_type_name="Multiplication Division")
problem_set_types.append(mult_div)
model.db.session.add(mult_div)

model.db.session.commit()

# create all 9 add_sub problem_sets, and all problem_set_questions for each
for data_set in problem_set_seed_data:
    problem_set = model.ProblemSet.create(
        problem_set_type_id=data_set["problem_set_type_id"],
        problem_set_level=data_set["problem_set_level"],
        problem_set_description=data_set["problem_set_description"],
    )

    model.db.session.add(problem_set)
    model.db.session.commit()

    if data_set["problem_set_type_id"] == 1:
        problem_set_questions = create_add_sub_problem_set_questions(
            data_set["list_of_part_part_wholes"]
        )
    elif data_set["problem_set_type_id"] == 2:
        problem_set_questions = create_mult_div_problem_set_questions(
            data_set["list_of_factor_factor_products"]
        )

    for question_text, answer_as_int in problem_set_questions:
        problem_set_question = model.ProblemSetQuestion.create(
            problem_set_id=problem_set.problem_set_id,
            question_text=question_text,
            answer_as_int=answer_as_int,
        )

        model.db.session.add(problem_set_question)
        model.db.session.commit()

# create 12 students per classroom
for classroom in classrooms:
    students = []
    grade_level_string = classroom.classroom_name[0]
    if grade_level_string == "K":
        grade_level = 0
    else:
        grade_level = int(grade_level_string)

    # will change this to actual icons down the road
    login_icons = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
    ]

    for i in range(12):
        plaintext_pw = "1234"
        bytes_pw = plaintext_pw.encode("utf-8")
        salt = bcrypt.gensalt()
        hashed_pw = bcrypt.hashpw(bytes_pw, salt)

        student = model.Student.create(
            classroom_id=classroom.classroom_id,
            student_first_name=fake.first_name(),
            student_last_name=fake.last_name(),
            student_grade_level=grade_level,
            student_login_icon=login_icons[i],
            student_password=hashed_pw,
            current_problem_set=choice([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        )  # hard coded, change if more prob sets added

        students.append(student)
        model.db.session.add(student)
        model.db.session.commit()

    # create problem_set_question_answers seed data
    # the first 4 students of each class will:
    # all questions in problem_sets 1, 2 & 3 correct, current_problem_set will be 4
    for student in students[:4]:
        problem_sets = [1, 2, 3]
        model.Student.update_current_problem_set(student.student_id, 4)
        model.db.session.commit()

        # fake dates are randomly chosen at the beginning of the school year, between Sept-1 and Nov-30
        # assessments are 1 week apart (to mimic actual student progress)
        year_string = classroom.classroom_name.split(" ")[1][:2]
        year = 2000 + int(year_string)
        date1 = fake.date_between(datetime(year, 9, 1), datetime(year, 11, 30))
        date2 = date1 + timedelta(days=7)
        date3 = date2 + timedelta(days=7)
        date4 = date3 + timedelta(days=7)

        # all questions in the first problem set are correct and fluent
        for (
            problem_set_question
        ) in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(
            problem_sets[0]
        ):
            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id,
                problem_set_question_id=problem_set_question.problem_set_question_id,
                student_answer=problem_set_question.answer_as_int,
                is_correct=True,
                is_fluent=True,
                time_to_answer=choice([5, 6, 7]),
                baseline_time=4,
                date_assessed=date1,
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()

        # all questions in the second problem set are correct and fluent
        for (
            problem_set_question
        ) in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(
            problem_sets[1]
        ):
            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id,
                problem_set_question_id=problem_set_question.problem_set_question_id,
                student_answer=problem_set_question.answer_as_int,
                is_correct=True,
                is_fluent=True,
                time_to_answer=choice([5, 6, 7]),
                baseline_time=4,
                date_assessed=date2,
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()

        # all questions in the third problem set are correct and fluent
        for (
            problem_set_question
        ) in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(
            problem_sets[2]
        ):
            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id,
                problem_set_question_id=problem_set_question.problem_set_question_id,
                student_answer=problem_set_question.answer_as_int,
                is_correct=True,
                is_fluent=True,
                time_to_answer=choice([5, 6, 7]),
                baseline_time=4,
                date_assessed=date3,
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()

        # for the fourth problem set, students get some questions correct, some incorrect
        for (
            problem_set_question
        ) in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(
            student.current_problem_set
        ):
            correct_answer = problem_set_question.answer_as_int
            possible_answers = [
                correct_answer,
                correct_answer,
                correct_answer,
                correct_answer,
                correct_answer,
                correct_answer,
                correct_answer,
                correct_answer,
                correct_answer,
                correct_answer + 1,
            ]
            student_answer = choice(possible_answers)

            if student_answer != correct_answer:
                is_fluent = False
            else:
                is_fluent = choice([True, True, True, True, True, False])

            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id,
                problem_set_question_id=problem_set_question.problem_set_question_id,
                student_answer=student_answer,
                is_correct=(correct_answer == student_answer),
                is_fluent=is_fluent,
                time_to_answer=choice([5, 6, 7]),
                baseline_time=4,
                date_assessed=date4,
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()

    # the next 4 students will have multiple attempts at their current problem set, with increased correctness and fluency over time
    for student in students[4:8]:
        problem_set = choice([1, 2, 3, 4, 5, 6])
        model.Student.update_current_problem_set(student.student_id, problem_set)
        model.db.session.commit()

        year_string = classroom.classroom_name.split(" ")[1][:2]
        year = 2000 + int(year_string)
        date1 = fake.date_between(datetime(year, 9, 1), datetime(year, 11, 30))
        date2 = date1 + timedelta(days=7)
        date3 = date2 + timedelta(days=7)

        # first attempt at the problem set
        for (
            problem_set_question
        ) in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(
            student.current_problem_set
        ):
            correct_answer = problem_set_question.answer_as_int
            possible_answers = [
                correct_answer - 1,
                correct_answer,
                correct_answer,
                correct_answer + 1,
            ]
            student_answer = choice(possible_answers)

            if student_answer != correct_answer:
                is_fluent = False
            else:
                is_fluent = choice([True, False, False])

            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id,
                problem_set_question_id=problem_set_question.problem_set_question_id,
                student_answer=student_answer,
                is_correct=(correct_answer == student_answer),
                is_fluent=is_fluent,
                time_to_answer=choice([1, 2, 2, 3, 3, 4]),
                baseline_time=2,
                date_assessed=date1,
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()

        # second attempt at the problem set, should be better than attempt #1
        for (
            problem_set_question
        ) in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(
            student.current_problem_set
        ):
            correct_answer = problem_set_question.answer_as_int
            possible_answers = [
                correct_answer - 1,
                correct_answer,
                correct_answer,
                correct_answer,
                correct_answer + 1,
            ]
            student_answer = choice(possible_answers)

            if student_answer != correct_answer:
                is_fluent = False
            else:
                is_fluent = choice([True, True, True, False, False])

            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id,
                problem_set_question_id=problem_set_question.problem_set_question_id,
                student_answer=student_answer,
                is_correct=(correct_answer == student_answer),
                is_fluent=is_fluent,
                time_to_answer=choice([1, 2, 2, 3, 3, 4]),
                baseline_time=2,
                date_assessed=date2,
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()

        # third attempt at the problem set, should be better than attempt #2
        for (
            problem_set_question
        ) in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(
            student.current_problem_set
        ):
            correct_answer = problem_set_question.answer_as_int
            possible_answers = [
                correct_answer - 1,
                correct_answer,
                correct_answer,
                correct_answer,
                correct_answer,
                correct_answer + 1,
            ]
            student_answer = choice(possible_answers)

            if student_answer != correct_answer:
                is_fluent = False
            else:
                is_fluent = choice([True, True, True, False])

            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id,
                problem_set_question_id=problem_set_question.problem_set_question_id,
                student_answer=student_answer,
                is_correct=(correct_answer == student_answer),
                is_fluent=is_fluent,
                time_to_answer=choice([1, 2, 2, 3, 3, 4]),
                baseline_time=2,
                date_assessed=date3,
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()

    # the last 4 students will have one not-so-great attempt at their current problem set
    for student in students[8:]:
        problem_set = choice([1, 2, 3, 4, 5, 6])
        model.Student.update_current_problem_set(student.student_id, problem_set)
        model.db.session.commit()

        year_string = classroom.classroom_name.split(" ")[1][:2]
        year = 2000 + int(year_string)
        date = fake.date_between(datetime(year, 9, 1), datetime(year, 11, 30))

        # third attempt at the problem set, should be better than attempt #2
        for (
            problem_set_question
        ) in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(
            student.current_problem_set
        ):
            correct_answer = problem_set_question.answer_as_int
            possible_answers = [
                correct_answer - 1,
                correct_answer,
                correct_answer + 1,
            ]
            student_answer = choice(possible_answers)

            if student_answer != correct_answer:
                is_fluent = False
            else:
                is_fluent = choice([True, False, False, False])

            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id,
                problem_set_question_id=problem_set_question.problem_set_question_id,
                student_answer=student_answer,
                is_correct=(correct_answer == student_answer),
                is_fluent=is_fluent,
                time_to_answer=choice([1, 2, 2, 3, 3, 4]),
                baseline_time=2,
                date_assessed=date1,
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()
