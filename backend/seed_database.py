"""Script to seed database."""

import os

import model
import server
from problem_set_questions_creator import problem_set_seed_data, create_mult_div_problem_set_questions, create_add_sub_problem_set_questions

from random import choice
from faker import Faker
fake = Faker()

from datetime import datetime, timedelta

os.system("dropdb factswise")
os.system("createdb factswise")

model.connect_to_db(server.app)
model.db.create_all()

#create 5 educators
educators = []
    
for _ in range(5):
    fname = fake.first_name()
    lname = fake.last_name()
    prefix = choice(['Ms.', 'Mr.','Teacher'])
    educator = model.Educator.create(
        educator_first_name=fname, 
        educator_last_name=lname, 
        educator_display_name=f"{prefix} {choice([fname, lname])}",
        educator_email=f"{fname.lower()}.{lname.lower()}@realschool.org", 
        educator_password="1234")

    educators.append(educator)
    model.db.session.add(educator)

model.db.session.commit()

#create 2 classrooms per educator
classrooms = []

for educator in educators:
    years = ['20-21', '21-22', '22-23']
    grade_level = choice(['K', '1st', '2nd', '3rd'])

    for i in range(2):
        classroom = model.Classroom.create(
            classroom_name=f"{grade_level} {years[i]}", 
            educator_id=educator.educator_id)

        classrooms.append(classroom)
        model.db.session.add(classroom)

model.db.session.commit()

#create both problem set types (no custom problem sets yet)
problem_set_types = []

add_sub = model.ProblemSetType.create(problem_set_type_name="Addition Subtraction")
problem_set_types.append(add_sub)
model.db.session.add(add_sub)
        
mult_div = model.ProblemSetType.create(problem_set_type_name="Multiplication Division")
problem_set_types.append(mult_div)
model.db.session.add(mult_div)

model.db.session.commit()

#create add_sub problem_sets 1-3, mult_div problem_sets 1-3, and all problem_set_questions for each
for data_set in problem_set_seed_data:
    problem_set = model.ProblemSet.create(
        problem_set_type_id=data_set["problem_set_type_id"], 
        problem_set_level=data_set["problem_set_level"], 
        problem_set_description=data_set["problem_set_description"])

    model.db.session.add(problem_set)
    model.db.session.commit()

    if data_set["problem_set_type_id"] == 1:
        problem_set_questions = create_add_sub_problem_set_questions(data_set["list_of_part_part_wholes"])
    elif data_set["problem_set_type_id"] == 2:
        problem_set_questions = create_mult_div_problem_set_questions(data_set["list_of_factor_factor_products"])

    for question_text, answer_text in problem_set_questions:
        problem_set_question = model.ProblemSetQuestion.create(
            problem_set_id=problem_set.problem_set_id, 
            question_text=question_text, 
            answer_text=answer_text)

        model.db.session.add(problem_set_question)
        model.db.session.commit()

#create 15 students per classroom
for classroom in classrooms:
    students = []
    grade_level_string = classroom.classroom_name[0]
    if grade_level_string == "K":
        grade_level = 0;
    else:
        grade_level = int(grade_level_string)

    # will change this to actual icons down the road
    login_icons = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']

    for i in range(15):
        student = model.Student.create(
            classroom_id=classroom.classroom_id,
            student_first_name=fake.first_name(), 
            student_last_name=fake.last_name(), 
            student_grade_level=grade_level, 
            student_login_icon=login_icons[i], 
            student_password='1234', 
            current_problem_set=choice([1,2,3,4,5,6])) #hard coded, change if more prob sets added

        students.append(student)
        model.db.session.add(student)
        model.db.session.commit()

    # create problem_set_question_answers seed data
    # the first 3 students of each class will:
    # K/1: get all questions in problem_sets 1 & 2 correct, current_problem_set will be 3
    # 2/3: get all questions in problem_sets 4 & 5 correct, current_problem_set will be 6
    for student in students[:3]:
        if student.student_grade_level < 2:
            problem_sets = [1,2]
            model.Student.update_current_problem_set(student.student_id, 3) 
            model.db.session.commit()
        elif student.student_grade_level >= 2:
            problem_sets = [4,5]
            model.Student.update_current_problem_set(student.student_id, 6) 
            model.db.session.commit()

        year_string = classroom.classroom_name.split(" ")[1][:2]
        year = 2000 + int(year_string)
        date1 = fake.date_between(datetime(year, 9, 1),datetime(year, 11, 30))
        date2 = date1 + timedelta(days=7)
        date3 = date2 + timedelta(days=7)

        for problem_set_question in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(problem_sets[0]):
            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id, 
                problem_set_question_id=problem_set_question.problem_set_question_id, 
                student_answer=problem_set_question.answer_text, 
                time_to_answer=choice([1,2,3]), 
                date_assessed=date1
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()

        for problem_set_question in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(problem_sets[1]):
            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id, 
                problem_set_question_id=problem_set_question.problem_set_question_id, 
                student_answer=problem_set_question.answer_text, 
                time_to_answer=choice([1,2,3]), 
                date_assessed=date2
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()

        for problem_set_question in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(student.current_problem_set):
            correct_answer = int(problem_set_question.answer_text)
            possible_answers = [correct_answer - 1, correct_answer, correct_answer + 1]
                
            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id, 
                problem_set_question_id=problem_set_question.problem_set_question_id, 
                student_answer=str(choice(possible_answers)), 
                time_to_answer=choice([1,2,3]), 
                date_assessed=date3
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()
    
    # students 5-7 will get questions randomly wrong or right in one grade-appropriate problem set
    for student in students[5:8]:
        if student.student_grade_level < 2:
            problem_set = choice([1,2,3])
            model.Student.update_current_problem_set(student.student_id, problem_set) 
            model.db.session.commit()
        elif student.student_grade_level >= 2:
            problem_set = choice([4,5,6])
            model.Student.update_current_problem_set(student.student_id, problem_set) 
            model.db.session.commit()

        year_string = classroom.classroom_name.split(" ")[1][:2]
        year = 2000 + int(year_string)
        date = fake.date_between(datetime(year, 9, 1),datetime(year, 11, 30))

        for problem_set_question in model.ProblemSet.get_all_problem_set_questions_by_problem_set_id(student.current_problem_set):
            correct_answer = int(problem_set_question.answer_text)
            possible_answers = [correct_answer - 1, correct_answer, correct_answer + 1]
                
            problem_set_question_answer = model.ProblemSetQuestionAnswer.create(
                student_id=student.student_id, 
                problem_set_question_id=problem_set_question.problem_set_question_id, 
                student_answer=str(choice(possible_answers)), 
                time_to_answer=choice([1,2,2,3,3,4]), 
                date_assessed=date
            )

            model.db.session.add(problem_set_question_answer)
            model.db.session.commit()