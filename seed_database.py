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

