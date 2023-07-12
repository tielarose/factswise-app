/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { AppContext } from '../../Context';
import InputButton from './InputButton';
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
        <InputButton setInputAnswer={setInputAnswer} value={0} />
        <InputButton setInputAnswer={setInputAnswer} value={1} />
        <InputButton setInputAnswer={setInputAnswer} value={2} />
        <InputButton setInputAnswer={setInputAnswer} value={3} />
        <InputButton setInputAnswer={setInputAnswer} value={4} />
        <InputButton setInputAnswer={setInputAnswer} value={5} />
        <InputButton setInputAnswer={setInputAnswer} value={6} />
        <InputButton setInputAnswer={setInputAnswer} value={7} />
        <InputButton setInputAnswer={setInputAnswer} value={8} />
        <InputButton setInputAnswer={setInputAnswer} value={9} />
        <InputButton setInputAnswer={setInputAnswer} value={10} />
      </div>
      <div className="numbers-container">
        <button disabled className="invisible" />
        <InputButton setInputAnswer={setInputAnswer} value={11} />
        <InputButton setInputAnswer={setInputAnswer} value={12} />
        <InputButton setInputAnswer={setInputAnswer} value={13} />
        <InputButton setInputAnswer={setInputAnswer} value={14} />
        <InputButton setInputAnswer={setInputAnswer} value={15} />
        <InputButton setInputAnswer={setInputAnswer} value={16} />
        <InputButton setInputAnswer={setInputAnswer} value={17} />
        <InputButton setInputAnswer={setInputAnswer} value={18} />
        <InputButton setInputAnswer={setInputAnswer} value={19} />
        <InputButton setInputAnswer={setInputAnswer} value={20} />
      </div>
    </div>
  );
}
