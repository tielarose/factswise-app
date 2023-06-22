/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { AppContext } from '../../Context';

const allStudentResponses = [];

export default function AssessmentQuestions({ problemSetQuestions, setHasAnsweredAllQuestions }) {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    const question = problemSetQuestions[currentQuestionNum];
    const isCorrect = parseInt(inputAnswer, 10) === question.answer_as_int;

    const problemSetQuestionAnswer = {
      problem_set_question_id: question.question_id,
      student_answer: parseInt(inputAnswer, 10),
      is_correct: isCorrect,
      time_to_answer: 2,
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

  return (
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
        />
      </label>
      <button type="submit">Next</button>
    </form>
  );
}
