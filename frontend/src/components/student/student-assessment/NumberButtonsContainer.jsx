/* eslint-disable react/prop-types */
import React from 'react';
import NumberButton from './NumberButton';

export default function NumberButtonsContainer(
  {
    setInputAnswer, setAnswerTime, startTime, setDisplayNumberButtons,
  },
) {
  // create NumberButton components for the range of numbers specified, inclusive
  function createNumberButtons(firstNum, lastNum) {
    const allButtons = [];

    for (let i = firstNum; i <= lastNum; i += 1) {
      const button = (
        <NumberButton
          setInputAnswer={setInputAnswer}
          setAnswerTime={setAnswerTime}
          setDisplayNumberButtons={setDisplayNumberButtons}
          startTime={startTime}
          value={i}
          key={`numberButton${i}`}
        />
      );

      allButtons.push(button);
    }

    return allButtons;
  }
  return (
    <div className="NumberButtonsContainer">
      <div className="number-buttons-row">
        { createNumberButtons(0, 10)}
      </div>
      <div className="number-buttons-row">
        <button type="button" disabled aria-label="disabled placeholder button" className="invisible" />
        { createNumberButtons(11, 20) }
      </div>
    </div>

  );
}
