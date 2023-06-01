"""Server for factswise app."""

from flask import Flask, jsonify
# from model import Educator
from model import connect_to_db, db, Educator

app = Flask(__name__)

@app.route("/api/educator/login/<educator_email>")
def check_if_educator_in_database(educator_email):
    """Check if an educator exists for the given email. If so, return that educator."""

    print("*" * 20)
    print("route was visited")
    educator = Educator.get_by_email(educator_email)

    if not educator:
        return jsonify({"educator_email": educator_email, "educator_id": None})
    else:
        return jsonify(educator.to_dict())


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)