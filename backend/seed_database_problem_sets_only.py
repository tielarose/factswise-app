"""Script to seed database.

No educators or students will be created, but all 
addition/subtraction problem_sets and problem_set_questions
will be created.

"""

import os

import model
import server
import bcrypt
from problem_set_questions_creator import (
    problem_set_seed_data,
    create_mult_div_problem_set_questions,
    create_add_sub_problem_set_questions,
)

os.system("dropdb factswise")
os.system("createdb factswise")

model.connect_to_db(server.app)
model.db.create_all()

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
