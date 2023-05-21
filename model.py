"""Models for factswise app"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Educator(db.Model):
    """An educator."""

    __tablename__ = "educators"

    educator_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    educator_first_name = db.Column(db.VARCHAR(50), nullable=False)
    educator_last_name = db.Column(db.VARCHAR(50), nullable=False)
    educator_display_name = db.Column(db.VARCHAR(50), nullable=False)
    educator_email = db.Column(db.VARCHAR(50), nullable=False, unique=True)
    educator_password = db.Column(db.VARCHAR(50), nullable=False)

    classrooms = db.relationship("Classroom", back_populates="educator")

    def __repr__(self):
        return f"<Educator educator_id={self.educator_id} display_name={self.educator_display_name} educator_email={self.educator_email}>"

    @classmethod
    def create(cls, educator_first_name, educator_last_name, educator_display_name, educator_email, educator_password):
        """Create and return a new educator."""
    
        return cls(educator_first_name=educator_first_name, educator_last_name=educator_last_name, educator_display_name=educator_display_name, educator_email=educator_email, educator_password=educator_password)

class Classroom(db.Model):
    """A classroom."""

    __tablename__ = "classrooms"

    classroom_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    classroom_name = db.Column(db.VARCHAR(15), nullable=False)
    educator_id = db.Column(db.Integer, db.ForeignKey("educators.educator_id"), nullable=False)

    educator = db.relationship("Educator", back_populates="classrooms")
    students = db.relationship("Student", back_populates="classroom")

    def __repr__(self):
        return f"<Classroom classroom_id={self.classroom_id} classroom_name={self.classroom_name}>"
    
    @classmethod
    def create(cls, classroom_name, educator_id):
        """Create and return a new classroom."""

        return cls(classroom_name=classroom_name, educator_id=educator_id)

class Student(db.Model):
    """A student."""

    __tablename__ = "students"

    student_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    classroom_id = db.Column(db.Integer, db.ForeignKey("classrooms.classroom_id"), nullable=False)
    student_first_name = db.Column(db.VARCHAR(50), nullable=False)
    student_last_name = db.Column(db.VARCHAR(50), nullable=False)
    student_grade_level = db.Column(db.Integer, nullable=False)
    student_login_icon = db.Column(db.VARCHAR(10), nullable=False)
    student_password = db.Column(db.VARCHAR(50), nullable=False)
    current_problem_set = db.Column(db.Integer, db.ForeignKey("problem_sets.problem_set_id"), nullable=False)

    classroom = db.relationship("Classroom", back_populates="students")
    problem_set = db.relationship("ProblemSet", back_populates="students")

    def __repr__(self):
        return f"<Student student_id={self.student_id} name={self.student_first_name} {self.student_last_name} classroom={self.classroom_id}>"

    @classmethod
    def create(cls, classroom_id, student_first_name, student_last_name, student_grade_level, student_login_icon, student_password, current_problem_set):
        """Create and return a new student."""
    
        return cls(classroom_id=classroom_id, student_first_name=student_first_name, student_last_name=student_last_name, student_grade_level=student_grade_level, student_login_icon=student_login_icon, student_password=student_password, current_problem_set=current_problem_set)

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
    problem_set_type_id = db.Column(db.Integer, db.ForeignKey("problem_set_types.problem_set_type_id"), nullable=False)
    problem_set_level = db.Column(db.Integer, nullable=False)
    problem_set_description = db.Column(db.VARCHAR(50), nullable=False)

    problem_set_type = db.relationship("ProblemSetType", back_populates="problem_sets")
    students = db.relationship("Student", back_populates="problem_set")

    def __repr__(self):
        return f"<ProblemSet problem_set_id={self.problem_set_id} problem_set_type_id={self.problem_set_type_id} problem_set_level={self.problem_set_level} problem_set_description={self.problem_set_description}>"

    @classmethod
    def create(cls, problem_set_type_id, problem_set_level, problem_set_description):
        """Create and return a new problem set."""
    
        return cls(problem_set_type_id=problem_set_type_id, problem_set_level=problem_set_level, problem_set_description=problem_set_description)
    
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
