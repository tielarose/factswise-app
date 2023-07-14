/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import AssessmentQuestion from './AssessmentQuestion';
import NumberButtonsContainer from './NumberButtonsContainer';

const allBaselineResponseTimes = [];

export default function BaselineTimerContainer(
  { setBaselineTime, setBaselineIsComplete, baselineQuestions },
) {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('?');
  const [answerTime, setAnswerTime] = useState(0);
  const startTime = Date.now();

  const handleNumberButtonClickInBaseline = useCallback((evt) => {
    setInputAnswer(evt.target.value);

    const currentQuestionAnswer = baselineQuestions[currentQuestionNum].answer_as_int;

    if (parseInt(evt.target.value, 10) === currentQuestionAnswer) {
      const endTime = Date.now();
      const totalTime = endTime - startTime;

      setAnswerTime(Math.round(totalTime / 1000));
      allBaselineResponseTimes.push(answerTime);

      if (currentQuestionNum === (baselineQuestions.length - 1)) {
        const sumBaselineTime = allBaselineResponseTimes.reduce((a, b) => a + b, 0);
        const avgBaselineTime = sumBaselineTime / baselineQuestions.length;
        setBaselineTime(avgBaselineTime);
        console.log('avgBaselineTime is', avgBaselineTime);
        setBaselineIsComplete(true);
      } else {
        setInputAnswer('?');
        setCurrentQuestionNum(() => (currentQuestionNum + 1));
      }
    }
  });

  return (
    <div className="AssessmentContainer">
      <h4>click the number you see</h4>
      <AssessmentQuestion
        question={baselineQuestions[currentQuestionNum]}
        inputAnswer={inputAnswer}
      />
      <NumberButtonsContainer
        handleNumberButtonClick={handleNumberButtonClickInBaseline}
      />
    </div>
  );
}
