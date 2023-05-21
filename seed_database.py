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

    print('line 30, educator is: ', educator)
    model.db.session.add(educator)

model.db.session.commit()

