"""Script to seed database."""

import os

import model
import server

from random import choice
from faker import Faker
fake = Faker()

os.system("dropdb factswise")
os.system("createdb factswise")

model.connect_to_db(server.app)
model.db.create_all()

#create 10 educators
educators = []
    
for _ in range(10):
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

#create 3 classrooms per educator
classrooms = []

for educator in educators:
    years = ['20-21', '21-22', '22-23']
    grade_level = choice(['K', '1st', '2nd', '3rd'])

    for i in range(3):
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

#create 15 students per classroom
students = []

for classroom in classrooms:
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
            # need to change this when problem_sets exists
            current_problem_set=choice([1,2,3,4]))

        students.append(student)
        model.db.session.add(student)

model.db.session.commit()