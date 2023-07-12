/* eslint-disable react/prop-types */
import React from 'react';

export default function InputButton({ setInputAnswer, value }) {
  return (
    <button
      type="button"
      onClick={(evt) => setInputAnswer(evt.target.value)}
      value={value}
    >
      {value}
    </button>
  );
}
