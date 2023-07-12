/* eslint-disable react/prop-types */
import React from 'react';

export default function InputButton({
  setInputAnswer, value, setAnswerTime, startTime,
}) {
  // runs when students submit their numerical answer; captures the time taken to answer
  function handleNumberButtonClick(evt) {
    setInputAnswer(evt.target.value);

    const endTime = Date.now();
    console.log('endTime is', endTime);
    const totalTime = endTime - startTime;
    console.log('totalTime is', totalTime);

    setAnswerTime(Math.round(totalTime / 100));
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
