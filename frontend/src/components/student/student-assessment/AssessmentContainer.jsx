/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import AssessmentQuestion from './AssessmentQuestion';
import NumberButtonsContainer from './NumberButtonsContainer';
import './AssessmentContainer.css';
import StrategyButtonsContainer from './StrategyButtonsContainer';

export default function AssessmentQuestions({ problemSetQuestions, setHasAnsweredAllQuestions }) {
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
