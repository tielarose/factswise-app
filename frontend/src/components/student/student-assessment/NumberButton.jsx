/* eslint-disable react/prop-types */
import React from 'react';

export default function InputButton({
  setInputAnswer, value, setAnswerTime, startTime, setDisplayNumberButtons,
}) {
  // runs when students submit their numerical answer; captures the time taken to answer
  function handleNumberButtonClick(evt) {
    setInputAnswer(evt.target.value);

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    setAnswerTime(Math.round(totalTime / 1000));
    setDisplayNumberButtons(false);
  }

  return (
    <button
      type="button"
      onClick={handleNumberButtonClick}
      value={value}
    >
      {value}
    </button>
  );
}
