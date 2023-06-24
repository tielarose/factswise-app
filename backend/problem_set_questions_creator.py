def create_add_sub_problem_set_questions(list_of_part_part_wholes):
    """Given a list of part-part-whole tuples, return a list of tuples with all possible addition and subtraction equations

    Input should be: [(part, part, whole), (part, part, whole)]
    Example input: [(1,4,5)]

    Output should be: [(string_question, answer_as_int), (string_question, answer_as_int)]
    Example output: [('1 + 4', 5), ('4 + 1', 5), ('5 - 4', 1), ('5 - 1', 4)]"""

    problem_set_questions = []

    for part1, part2, whole in list_of_part_part_wholes:
        if part1 != part2:
            problem_set_questions.append((f"{part1} + {part2}", whole))
            problem_set_questions.append((f"{part2} + {part1}", whole))
            problem_set_questions.append((f"{whole} - {part1}", part2))
            problem_set_questions.append((f"{whole} - {part2}", part1))
        else:
            problem_set_questions.append((f"{part1} + {part2}", whole))
            problem_set_questions.append((f"{whole} - {part1}", part2))

    return problem_set_questions


def create_mult_div_problem_set_questions(list_of_factor_factor_products):
    """Given a list of factor-factor-product tuples, return a list of tuples with all possible multiplication and division equations

    Input should be: [(factor, factor, product), (factor, factor, product)]
    Example input: [(10,2,20)]

    Output should be: [(string_question, answer_as_int), (string_question, answer_as_int)]
    Example output: [('10 * 2', 20), ('2 * 10', 20), ('20 / 2', 10), ('20 / 10', 2)]
    """

    problem_set_questions = []

    for factor1, factor2, product in list_of_factor_factor_products:
        if factor1 != factor2:
            problem_set_questions.append((f"{factor1} * {factor2}", product))
            problem_set_questions.append((f"{factor2} * {factor1}", product))
            problem_set_questions.append((f"{product} / {factor1}", factor2))
            problem_set_questions.append((f"{product} / {factor2}", factor1))
        else:
            problem_set_questions.append((f"{factor1} * {factor2}", product))
            problem_set_questions.append((f"{product} / {factor1}", factor2))

    return problem_set_questions


problem_set_seed_data = [
    {
        "problem_set_type_id": 1,
        "problem_set_type_desciption": "Addition Subtraction",
        "problem_set_level": 1,
        "problem_set_description": "Within 4 and 5",
        "list_of_part_part_wholes": [(1, 3, 4), (2, 2, 4), (1, 4, 5), (2, 3, 5)],
    },
    {
        "problem_set_type_id": 1,
        "problem_set_type_desciption": "Addition Subtraction",
        "problem_set_level": 2,
        "problem_set_description": "With 5 (Part I)",
        "list_of_part_part_wholes": [
            (0, 5, 5),
            (1, 5, 6),
            (2, 5, 7),
            (3, 5, 8),
            (4, 5, 9),
            (5, 5, 10),
        ],
    },
    {
        "problem_set_type_id": 1,
        "problem_set_type_desciption": "Addition Subtraction",
        "problem_set_level": 3,
        "problem_set_description": "Within 10",
        "list_of_part_part_wholes": [
            (0, 10, 10),
            (1, 9, 10),
            (2, 8, 10),
            (3, 7, 10),
            (4, 6, 10),
            (5, 5, 10),
        ],
    },
    {
        "problem_set_type_id": 1,
        "problem_set_type_desciption": "Addition Subtraction",
        "problem_set_level": 4,
        "problem_set_description": "With 10",
        "list_of_part_part_wholes": [
            (10, 1, 11),
            (10, 2, 12),
            (10, 3, 13),
            (10, 4, 14),
            (10, 5, 15),
            (10, 6, 16),
            (10, 7, 17),
            (10, 8, 18),
            (10, 9, 19),
            (10, 10, 20),
        ],
    },
    {
        "problem_set_type_id": 1,
        "problem_set_type_desciption": "Addition Subtraction",
        "problem_set_level": 5,
        "problem_set_description": "With 5 (Part II)",
        "list_of_part_part_wholes": [
            (5, 6, 11),
            (5, 7, 12),
            (5, 8, 13),
            (5, 9, 14),
        ],
    },
    {
        "problem_set_type_id": 1,
        "problem_set_type_desciption": "Addition Subtraction",
        "problem_set_level": 6,
        "problem_set_description": "Doubles",
        "list_of_part_part_wholes": [
            (3, 3, 6),
            (4, 4, 8),
            (5, 5, 10),
            (6, 6, 12),
            (7, 7, 14),
            (8, 8, 16),
            (9, 9, 18),
        ],
    },
    {
        "problem_set_type_id": 1,
        "problem_set_type_desciption": "Addition Subtraction",
        "problem_set_level": 7,
        "problem_set_description": "Under 10",
        "list_of_part_part_wholes": [
            (2, 4, 6),
            (2, 6, 8),
            (2, 7, 9),
            (3, 4, 7),
            (3, 6, 9),
        ],
    },
    {
        "problem_set_type_id": 1,
        "problem_set_type_desciption": "Addition Subtraction",
        "problem_set_level": 8,
        "problem_set_description": "With 9",
        "list_of_part_part_wholes": [
            (2, 9, 11),
            (3, 9, 12),
            (4, 9, 13),
            (5, 9, 14),
            (6, 9, 15),
            (7, 9, 16),
            (8, 9, 17),
        ],
    },
    {
        "problem_set_type_id": 1,
        "problem_set_type_desciption": "Addition Subtraction",
        "problem_set_level": 9,
        "problem_set_description": "With 7 and 8",
        "list_of_part_part_wholes": [
            (4, 7, 11),
            (6, 7, 13),
            (3, 8, 11),
            (4, 8, 12),
            (6, 8, 14),
            (7, 8, 15),
        ],
    },
    {
        "problem_set_type_id": 2,
        "problem_set_type_desciption": "Multiplication Division",
        "problem_set_level": 1,
        "problem_set_description": "10s",
        "list_of_factor_factor_products": [
            (10, 2, 20),
            (10, 3, 30),
            (10, 4, 40),
            (10, 5, 50),
            (10, 6, 60),
            (10, 7, 70),
            (10, 8, 80),
            (10, 9, 90),
            (10, 10, 100),
        ],
    },
    {
        "problem_set_type_id": 2,
        "problem_set_type_desciption": "Multiplication Division",
        "problem_set_level": 2,
        "problem_set_description": "5s",
        "list_of_factor_factor_products": [
            (2, 5, 10),
            (3, 5, 15),
            (4, 5, 20),
            (5, 5, 25),
            (6, 5, 30),
            (7, 5, 35),
            (8, 5, 40),
            (9, 5, 45),
        ],
    },
    {
        "problem_set_type_id": 2,
        "problem_set_type_desciption": "Multiplication Division",
        "problem_set_level": 3,
        "problem_set_description": "2s",
        "list_of_factor_factor_products": [
            (2, 2, 4),
            (3, 2, 6),
            (4, 2, 8),
            (5, 2, 10),
            (6, 2, 12),
            (7, 2, 14),
            (8, 2, 16),
            (9, 2, 18),
        ],
    },
    {
        "problem_set_type_id": 2,
        "problem_set_type_desciption": "Multiplication Division",
        "problem_set_level": 4,
        "problem_set_description": "4s",
        "list_of_factor_factor_products": [
            (2, 4, 8),
            (3, 4, 12),
            (4, 4, 16),
            (5, 4, 20),
            (6, 4, 24),
            (7, 4, 28),
            (8, 4, 32),
            (9, 4, 36),
        ],
    },
    {
        "problem_set_type_id": 2,
        "problem_set_type_desciption": "Multiplication Division",
        "problem_set_level": 5,
        "problem_set_description": "8s",
        "list_of_factor_factor_products": [
            (2, 8, 16),
            (3, 8, 24),
            (4, 8, 32),
            (5, 8, 40),
            (6, 8, 48),
            (7, 8, 56),
            (8, 8, 64),
            (9, 8, 72),
        ],
    },
    {
        "problem_set_type_id": 2,
        "problem_set_type_desciption": "Multiplication Division",
        "problem_set_level": 6,
        "problem_set_description": "3s",
        "list_of_factor_factor_products": [
            (2, 3, 6),
            (3, 3, 9),
            (4, 3, 12),
            (5, 3, 15),
            (6, 3, 18),
            (7, 3, 21),
            (8, 3, 24),
            (9, 3, 27),
        ],
    },
    {
        "problem_set_type_id": 2,
        "problem_set_type_desciption": "Multiplication Division",
        "problem_set_level": 7,
        "problem_set_description": "6s",
        "list_of_factor_factor_products": [
            (2, 6, 12),
            (3, 6, 18),
            (4, 6, 24),
            (5, 6, 30),
            (6, 6, 36),
            (7, 6, 42),
            (8, 6, 48),
            (9, 6, 54),
        ],
    },
    {
        "problem_set_type_id": 2,
        "problem_set_type_desciption": "Multiplication Division",
        "problem_set_level": 8,
        "problem_set_description": "7s",
        "list_of_factor_factor_products": [
            (2, 7, 14),
            (3, 7, 21),
            (4, 7, 28),
            (5, 7, 35),
            (6, 7, 42),
            (7, 7, 49),
            (8, 7, 56),
            (9, 7, 63),
        ],
    },
    {
        "problem_set_type_id": 2,
        "problem_set_type_desciption": "Multiplication Division",
        "problem_set_level": 9,
        "problem_set_description": "9s",
        "list_of_factor_factor_products": [
            (2, 9, 18),
            (3, 9, 27),
            (4, 9, 36),
            (5, 9, 45),
            (6, 9, 54),
            (7, 9, 63),
            (8, 9, 72),
            (9, 9, 81),
        ],
    },
]
