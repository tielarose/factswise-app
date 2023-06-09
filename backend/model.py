"""Models for factswise app"""

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
import uuid

db = SQLAlchemy()


class Educator(db.Model):
    """An educator."""

    __tablename__ = "educators"

    educator_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    educator_first_name = db.Column(db.VARCHAR(50), nullable=False)
    educator_last_name = db.Column(db.VARCHAR(50), nullable=False)
    educator_display_name = db.Column(db.VARCHAR(50), nullable=False)
    educator_email = db.Column(db.VARCHAR(50), nullable=False, unique=True)
    educator_password = db.Column(db.LargeBinary, nullable=False)

    classrooms = db.relationship("Classroom", back_populates="educator")

    def __repr__(self):
        return f"<Educator educator_id={self.educator_id} display_name={self.educator_display_name} educator_email={self.educator_email}>"

    @classmethod
    def create(
        cls,
        educator_first_name,
        educator_last_name,
        educator_display_name,
        educator_email,
        educator_password,
    ):
        """Create and return a new educator."""

        return cls(
            educator_first_name=educator_first_name,
            educator_last_name=educator_last_name,
            educator_display_name=educator_display_name,
            educator_email=educator_email,
            educator_password=educator_password,
        )

    @classmethod
    def get_by_email(cls, educator_email):
        return cls.query.filter(cls.educator_email == educator_email).first()

    @classmethod
    def get_by_id(cls, educator_id):
        return cls.query.get(educator_id)

    def to_dict(self):
        return {
            "educator_id": self.educator_id,
            "educator_first_name": self.educator_first_name,
            "educator_last_name": self.educator_last_name,
            "educator_display_name": self.educator_display_name,
            "educator_email": self.educator_email,
        }


class Classroom(db.Model):
    """A classroom."""

    __tablename__ = "classrooms"

    classroom_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    classroom_name = db.Column(db.VARCHAR(15), nullable=False)
    classroom_code = db.Column(db.VARCHAR(6), nullable=False, unique=True)
    educator_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("educators.educator_id"), nullable=False
    )

    educator = db.relationship("Educator", back_populates="classrooms")
    students = db.relationship("Student", back_populates="classroom")

    def __repr__(self):
        return f"<Classroom classroom_id={self.classroom_id} classroom_name={self.classroom_name}>"

    @classmethod
    def create(cls, classroom_name, classroom_code, educator_id):
        """Create and return a new classroom."""

        return cls(
            classroom_name=classroom_name,
            classroom_code=classroom_code,
            educator_id=educator_id,
        )

    @classmethod
    def get_by_id(cls, classroom_id):
        return cls.query.get(classroom_id)

    @classmethod
    def get_by_classroom_code(cls, classroom_code):
        return cls.query.filter(cls.classroom_code == classroom_code).first()

    def to_dict(self):
        return {
            "classroom_id": self.classroom_id,
            "classroom_name": self.classroom_name,
            "classroom_code": self.classroom_code,
            "educator_id": self.educator_id,
        }


class Student(db.Model):
    """A student."""

    __tablename__ = "students"

    student_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    classroom_id = db.Column(
        db.Integer, db.ForeignKey("classrooms.classroom_id"), nullable=False
    )
    student_first_name = db.Column(db.VARCHAR(50), nullable=False)
    student_last_name = db.Column(db.VARCHAR(50), nullable=False)
    student_grade_level = db.Column(db.Integer, nullable=False)
    student_login_icon = db.Column(db.VARCHAR(10), nullable=False)
    student_password = db.Column(db.LargeBinary, nullable=False)
    current_problem_set = db.Column(
        db.Integer, db.ForeignKey("problem_sets.problem_set_id"), nullable=False
    )

    classroom = db.relationship("Classroom", back_populates="students")
    problem_set = db.relationship("ProblemSet", back_populates="students")
    problem_set_question_answers = db.relationship(
        "ProblemSetQuestionAnswer", back_populates="student"
    )

    def __repr__(self):
        return f"<Student student_id={self.student_id} name={self.student_first_name} {self.student_last_name} classroom={self.classroom_id}>"

    @classmethod
    def create(
        cls,
        classroom_id,
        student_first_name,
        student_last_name,
        student_grade_level,
        student_login_icon,
        student_password,
        current_problem_set,
    ):
        """Create and return a new student."""

        return cls(
            classroom_id=classroom_id,
            student_first_name=student_first_name,
            student_last_name=student_last_name,
            student_grade_level=student_grade_level,
            student_login_icon=student_login_icon,
            student_password=student_password,
            current_problem_set=current_problem_set,
        )

    @classmethod
    def get_by_id(cls, student_id):
        return cls.query.get(student_id)

    @classmethod
    def update_current_problem_set(cls, student_id, new_problem_set_id):
        """Update a student's current problem set, given a student_id and the updated problem set id."""

        student = cls.query.get(student_id)
        student.current_problem_set = new_problem_set_id

    @classmethod
    def update_basic_info(
        cls,
        student_id,
        new_classroom_id,
        new_student_first_name,
        new_student_last_name,
        new_student_grade_level,
        new_student_login_icon,
        new_current_problem_set,
    ):
        """Update a student's information."""

        student = cls.query.get(student_id)
        student.classroom_id = new_classroom_id
        student.student_first_name = new_student_first_name
        student.student_last_name = new_student_last_name
        student.student_grade_level = new_student_grade_level
        student.student_login_icon = new_student_login_icon
        student.current_problem_set = new_current_problem_set

    @classmethod
    def update_name(cls, student_id, new_first_name):
        student = cls.query.get(student_id)
        student.student_first_name = new_first_name

    @classmethod
    def update_password(cls, student_id, new_password):
        student = cls.query.get(student_id)
        student.student_password = new_password

    def to_dict(self):
        return {
            "student_id": self.student_id,
            "classroom_id": self.classroom_id,
            "student_first_name": self.student_first_name,
            "student_last_name": self.student_last_name,
            "student_grade_level": self.student_grade_level,
            "student_login_icon": self.student_login_icon,
            "current_problem_set": self.current_problem_set,
        }


class ProblemSetType(db.Model):
    """A problem set type."""

    __tablename__ = "problem_set_types"

    problem_set_type_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    problem_set_type_name = db.Column(db.VARCHAR(50), nullable=False)

    problem_sets = db.relationship("ProblemSet", back_populates="problem_set_type")

    def __repr__(self):
        return f"<ProblemSetType problem_set_type_id={self.problem_set_type_id} problem_set_type_name={self.problem_set_type_name}>"

    @classmethod
    def create(cls, problem_set_type_name):
        """Create and return a new problem set type"""

        return cls(problem_set_type_name=problem_set_type_name)


class ProblemSet(db.Model):
    """A problem set."""

    __tablename__ = "problem_sets"

    problem_set_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    problem_set_type_id = db.Column(
        db.Integer,
        db.ForeignKey("problem_set_types.problem_set_type_id"),
        nullable=False,
    )
    problem_set_level = db.Column(db.Integer, nullable=False)
    problem_set_description = db.Column(db.VARCHAR(50), nullable=False)

    problem_set_type = db.relationship("ProblemSetType", back_populates="problem_sets")
    students = db.relationship("Student", back_populates="problem_set")
    problem_set_questions = db.relationship(
        "ProblemSetQuestion", back_populates="problem_set"
    )

    def __repr__(self):
        return f"<ProblemSet problem_set_id={self.problem_set_id} problem_set_type_id={self.problem_set_type_id} problem_set_level={self.problem_set_level} problem_set_description={self.problem_set_description}>"

    @classmethod
    def create(cls, problem_set_type_id, problem_set_level, problem_set_description):
        """Create and return a new problem set."""

        return cls(
            problem_set_type_id=problem_set_type_id,
            problem_set_level=problem_set_level,
            problem_set_description=problem_set_description,
        )

    @classmethod
    def get_all_problem_set_questions_by_problem_set_id(cls, problem_set_id):
        """Return a list of all problem_set_questions, given a problem_set_id."""

        return cls.query.get(problem_set_id).problem_set_questions


class ProblemSetQuestion(db.Model):
    """A problem set question."""

    __tablename__ = "problem_set_questions"

    problem_set_question_id = db.Column(
        db.Integer, primary_key=True, autoincrement=True
    )
    problem_set_id = db.Column(
        db.Integer, db.ForeignKey("problem_sets.problem_set_id"), nullable=False
    )
    question_text = db.Column(db.VARCHAR(30), nullable=False)
    answer_as_int = db.Column(db.Integer, nullable=False)

    problem_set = db.relationship("ProblemSet", back_populates="problem_set_questions")
    problem_set_question_answers = db.relationship(
        "ProblemSetQuestionAnswer", back_populates="problem_set_question"
    )

    def __repr__(self):
        return f"<ProblemSetQuestion problem_set_question_id={self.problem_set_question_id} problem_set_id={self.problem_set_id} question_text={self.question_text} answer_as_int={self.answer_as_int}>"

    @classmethod
    def create(cls, problem_set_id, question_text, answer_as_int):
        """Create and return a new problem set question."""

        return cls(
            problem_set_id=problem_set_id,
            question_text=question_text,
            answer_as_int=answer_as_int,
        )


class ProblemSetQuestionAnswer(db.Model):
    """A student's answer to a problem set question."""

    __tablename__ = "problem_set_question_answers"

    problem_set_question_answer_id = db.Column(
        db.Integer, primary_key=True, autoincrement=True
    )
    student_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("students.student_id"), nullable=False
    )
    problem_set_question_id = db.Column(
        db.Integer, db.ForeignKey("problem_set_questions.problem_set_question_id")
    )
    student_answer = db.Column(db.VARCHAR(10), nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    is_fluent = db.Column(db.Boolean, nullable=False)
    time_to_answer = db.Column(db.Integer, nullable=False)
    baseline_time = db.Column(db.Integer, nullable=False)
    date_assessed = db.Column(db.DateTime, nullable=False)

    student = db.relationship("Student", back_populates="problem_set_question_answers")
    problem_set_question = db.relationship(
        "ProblemSetQuestion", back_populates="problem_set_question_answers"
    )

    def __repr__(self):
        return f"<ProblemSetQuestionAnswer problem_set_question_answer_id={self.problem_set_question_answer_id} student_id={self.student_id} date_assessed={self.date_assessed} is_correct={self.is_correct} is_fluent={self.is_fluent}>"

    @classmethod
    def create(
        cls,
        student_id,
        problem_set_question_id,
        student_answer,
        is_correct,
        is_fluent,
        time_to_answer,
        baseline_time,
        date_assessed,
    ):
        """Create and return a student's answer to a problem set question."""

        return cls(
            student_id=student_id,
            problem_set_question_id=problem_set_question_id,
            student_answer=student_answer,
            is_correct=is_correct,
            is_fluent=is_fluent,
            time_to_answer=time_to_answer,
            baseline_time=baseline_time,
            date_assessed=date_assessed,
        )

    def to_dict(self):
        return {
            "problem_set_question_answer_id": self.problem_set_question_answer_id,
            "student_id": self.student_id,
            "problem_set_question_id": self.problem_set_question_id,
            "student_answer": self.student_answer,
            "is_correct": self.is_correct,
            "is_fluent": self.is_fluent,
            "time_to_answer": self.time_to_answer,
            "baseline_time": self.baseline_time,
            "date_assessed": self.date_assessed,
        }


def connect_to_db(flask_app, db_uri="postgresql:///factswise", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)
