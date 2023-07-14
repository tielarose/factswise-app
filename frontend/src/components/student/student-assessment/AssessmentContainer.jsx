/* eslint-disable react/prop-types */
import React, { useState, useCallback, useContext } from 'react';
import AssessmentQuestion from './AssessmentQuestion';
import NumberButtonsContainer from './NumberButtonsContainer';
import './AssessmentContainer.css';
import StrategyButtonsContainer from './StrategyButtonsContainer';
import { AppContext } from '../../Context';

const allStudentResponses = [];

export default function AssessmentQuestions(
  { problemSetQuestions, setHasAnsweredAllQuestions, baselineTime },
) {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('?');
  const [answerTime, setAnswerTime] = useState(0);
  const [displayNumberButtons, setDisplayNumberButtons] = useState(true);
  const startTime = Date.now();

  const handleNumberButtonClickInAssessment = useCallback((evt) => {
    setInputAnswer(evt.target.value);

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    setAnswerTime(Math.round(totalTime / 1000));
    setDisplayNumberButtons(false);
  });

  const handleStrategyButtonClick = useCallback((evt) => {
    const buttonValue = (evt.target.parentNode.value || evt.target.value);
    const isFluentStrategy = buttonValue === 'fluent_strategy';
    const question = problemSetQuestions[currentQuestionNum];
    const isCorrect = parseInt(inputAnswer, 10) === question.answer_as_int;
    const isFluentTime = answerTime <= (baselineTime + 4);

    const problemSetQuestionAnswer = {
      problem_set_question_id: question.question_id,
      student_answer: parseInt(inputAnswer, 10),
      is_correct: isCorrect,
      time_to_answer: answerTime,
      is_fluent: isFluentStrategy && isCorrect && isFluentTime,
      baseline_time: baselineTime,
    };

    allStudentResponses.push(problemSetQuestionAnswer);

    // if the student reaches the last question, stop and send the data to the server
    if (currentQuestionNum === (problemSetQuestions.length - 1)) {
      const formInputs = { student_id: currentUser.student_id, all_answers: allStudentResponses };

      fetch('/api/student/submitanswers', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: { 'Content-Type': 'application/json' },
      });
      setHasAnsweredAllQuestions(true);
    } else {
      setInputAnswer('?');
      setDisplayNumberButtons(true);
      setCurrentQuestionNum(() => (currentQuestionNum + 1));
    }
  });

  return (
    <div className="AssessmentContainer">
      <AssessmentQuestion
        question={problemSetQuestions[currentQuestionNum]}
        inputAnswer={inputAnswer}
      />
      { displayNumberButtons ? (
        <NumberButtonsContainer
          handleNumberButtonClick={handleNumberButtonClickInAssessment}
        />
      ) : (
        <StrategyButtonsContainer
          handleStrategyButtonClick={handleStrategyButtonClick}
        />
      )}
    </div>
  );
}
