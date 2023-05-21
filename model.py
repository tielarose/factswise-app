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

    classes = db.relationship("Class", back_populates="educator")

    def __repr__(self):
        return f"<Educator educator_id={self.educator_id} display_name={self.educator_display_name} educator_email={self.educator_email}>"

    @classmethod
    def create(cls, educator_first_name, educator_last_name, educator_display_name, educator_email, educator_password):
        """Create and return a new educator."""
    
        return cls(educator_first_name=educator_first_name, educator_last_name=educator_last_name, educator_display_name=educator_display_name, educator_email=educator_email, educator_password=educator_password)

class Class(db.Model):
    """A class[room of students]."""

    __tablename__ = "classes"

    class_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    class_name = db.Column(db.VARCHAR(15), nullable=False)
    educator_id = db.Column(db.Integer, db.ForeignKey("educators.educator_id"))

    educator = db.relationship("Educator", back_populates="classes")

    def __repr__(self):
        return f"<Class class_id={self.class_id} class_name={self.class_name}>"
    
    @classmethod
    def create(cls, class_name, educator_id):
        """Create and return a new class[room of students]."""

        return cls(class_name=class_name, educator_id=educator_id)

    
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
