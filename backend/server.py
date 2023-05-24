"""Server for factswise app."""

from flask import Flask

app = Flask(__name__)


# server routes will go here


if __name__ == "__main__":

    app.run(host="0.0.0.0", debug=True)