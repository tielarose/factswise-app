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
            (2, 3, 6),
            (2, 4, 8),
            (2, 6, 12),
            (2, 7, 14),
            (2, 8, 16),
            (2, 9, 18),
        ],
    },
]
