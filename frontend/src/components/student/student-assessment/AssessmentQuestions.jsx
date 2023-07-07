/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { AppContext } from '../../Context';
import './AssessmentQuestions.css';

const allStudentResponses = [];

export default function AssessmentQuestions({ problemSetQuestions, setHasAnsweredAllQuestions }) {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('');

  const startTime = Date.now();

  function handleSubmit(evt) {
    evt.preventDefault();

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    const question = problemSetQuestions[currentQuestionNum];
    const isCorrect = parseInt(inputAnswer, 10) === question.answer_as_int;

    const problemSetQuestionAnswer = {
      problem_set_question_id: question.question_id,
      student_answer: parseInt(inputAnswer, 10),
      is_correct: isCorrect,
      time_to_answer: Math.round(totalTime / 100),
    };

    allStudentResponses.push(problemSetQuestionAnswer);

    // if the student reaches the last question, stop and send the data to the server
    if (currentQuestionNum === (problemSetQuestions.length - 1)) {
      const formInputs = { student_id: currentUser.student_id, all_answers: allStudentResponses };

      fetch('/api/student/submitanswers', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      setHasAnsweredAllQuestions(true);
    } else {
      setInputAnswer('');
      setCurrentQuestionNum(() => (currentQuestionNum + 1));
    }
  }

  function handleNumberButtonClick(evt) {
    if (inputAnswer !== '') {
      console.log(inputAnswer, evt.target.value)
      setInputAnswer(() => inputAnswer + evt.target.value);
    } else {
      setInputAnswer(() => evt.target.value);
    }
  }

  return (
    <div className="assessment-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="student-answer">
          {problemSetQuestions[currentQuestionNum]?.question_text}
          { ' ' }
          {' '}
          =
          {' '}
          { ' ' }
          <input
            name="student=answer"
            id="student-answer"
            type="text"
            value={inputAnswer}
            onChange={(evt) => setInputAnswer(evt.target.value)}
            required
          />
        </label>
        <button type="submit" className="button-yellow">Next</button>
      </form>
      <div className="numbers-container">
        <button type="button" onClick={handleNumberButtonClick} value={0}>0</button>
        <button type="button" onClick={handleNumberButtonClick} value={1}>1</button>
        <button type="button" onClick={handleNumberButtonClick} value={2}>2</button>
        <button type="button" onClick={handleNumberButtonClick} value={3}>3</button>
        <button type="button" onClick={handleNumberButtonClick} value={4}>4</button>
        <button type="button" onClick={handleNumberButtonClick} value={5}>5</button>
        <button type="button" onClick={handleNumberButtonClick} value={6}>6</button>
        <button type="button" onClick={handleNumberButtonClick} value={7}>7</button>
        <button type="button" onClick={handleNumberButtonClick} value={8}>8</button>
        <button type="button" onClick={handleNumberButtonClick} value={9}>9</button>
      </div>
    </div>
  );
}
