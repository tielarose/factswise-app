/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import AssessmentQuestion from './AssessmentQuestion';
import NumberButtonsContainer from './NumberButtonsContainer';
import './AssessmentContainer.css';
import StrategyButtonsContainer from './StrategyButtonsContainer';

// const allStudentResponses = [];

export default function AssessmentQuestions({ problemSetQuestions, setHasAnsweredAllQuestions }) {
  // const allContext = useContext(AppContext);
  // const { currentUser } = allContext;
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('?');
  const [answerTime, setAnswerTime] = useState(0);
  const [displayNumberButtons, setDisplayNumberButtons] = useState(true);
  const startTime = Date.now();

  // runs when students click on the strategy they used
  // creates a problem_set_question_answer dictionary and moves
  // the student to the next question; if all questions have been answered,
  // stops and sends the data to the server

  return (
    <div className="AssessmentContainer">
      <AssessmentQuestion
        question={problemSetQuestions[currentQuestionNum]}
        inputAnswer={inputAnswer}
      />
      { displayNumberButtons ? (
        <NumberButtonsContainer
          setInputAnswer={setInputAnswer}
          setAnswerTime={setAnswerTime}
          startTime={startTime}
          setDisplayNumberButtons={setDisplayNumberButtons}
        />
      ) : (
        <StrategyButtonsContainer
          problemSetQuestions={problemSetQuestions}
          currentQuestionNum={currentQuestionNum}
          setHasAnsweredAllQuestions={setHasAnsweredAllQuestions}
          setInputAnswer={setInputAnswer}
          setDisplayNumberButtons={setDisplayNumberButtons}
          setCurrentQuestionNum={setCurrentQuestionNum}
          inputAnswer={inputAnswer}
          answerTime={answerTime}
        />
      )}
    </div>
  );
}
