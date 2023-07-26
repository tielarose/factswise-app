# MathFacts Assessments

MathFacts Assessments is a student-friendly assessment platform that provides educators with detailed math fluency data and easy progress tracking, without the burden of having to assess students one-on-one. Based on the FactsWise curriculum and currently available for classroom use at [mathfactsapp.com](https://mathfactsapp.com/)

# Tech Stack

Python, Javascript, React, Flask, PostgreSQL, HTML, CSS

# Features

### Account Creation

Educators create an account

![](https://github.com/tielarose/factswise-app/blob/main/gifs/educator_acct_creation.gif)

create classrooms within that account

![](https://github.com/tielarose/factswise-app/blob/main/gifs/classroom_creation.gif)

and add students to those classrooms.

![](https://github.com/tielarose/factswise-app/blob/main/gifs/student_creation.gif)

### Student Login

Students log in via classroom code, their name, and an educator-set password.

![](https://github.com/tielarose/factswise-app/blob/main/gifs/student_login_gif.gif)


### Student Assessments

Before every assessment, students complete a "baseline assessment" in which they match random numbers that appear on the screen. Their response times are recorded and averaged to account for different processing times among different students.

![](https://github.com/tielarose/factswise-app/blob/main/gifs/baseline_assessment.gif)

In the assessment portion, student response time is analyzed against that day's baseline, so fluency is personalized for that student (strategy and answer correctness are also factored into fluency).

![](https://github.com/tielarose/factswise-app/blob/main/gifs/assessment.gif)


### Educator Dashboard

Logged in educators can see their student's latest assessment data, toggling between classrooms and sorting by any column. The flag feature automatically highlights students based on their scores.

![](https://github.com/tielarose/factswise-app/blob/main/gifs/educator_dashboard.gif)

Educators can click into a student's account to see all their past assessments, edit their information, change their problem set level, and reset their password.

![](https://github.com/tielarose/factswise-app/blob/main/gifs/student_details.gif)

# Set Up

Start a virtual environment

    virtualenv env
    source env/bin/activate

Install requirements

    cd backend/
    pip3 install -r requirements.txt

### Seed the database

If you'd like to be able to log in as an educator and see fake student data, run the following file to seed the database. By default, it will create a fake educator with email address tiela.black-law@realschool.org, password 1234.

    python3 backend/seed_database.py

To change the default educator information, change the name and plaintext_password on lines 56 - 59, and then rerun the file. The file will create a login for fname.lname@realschool.org, with the password you set.

    56    fname = "Tiela"
    57    lname = "Black-Law"
    58    prefix = "Ms."
    59    plaintext_pw = "1234"

If you'd prefer a database with no educators or students, seed the problem_sets and problem_set_questions only:

    python3 backend/seed_database_problem_sets_only.py

# Run Application

Open two terminals.

If you haven't already, start a virtual environment and install project dependencies.

    virtualenv env
    source env/bin/activate
    cd backend/
    pip3 install -r requirements.txt

Go to the web app root folder.

    cd ~/src/factswise-app

In one terminal, start the Flask server.

    python3 backend/server.py

In the other terminal, start vite.

    cd frontend
    npm run dev
    
