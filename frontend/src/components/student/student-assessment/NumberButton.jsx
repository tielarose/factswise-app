/* eslint-disable react/prop-types */
import React from 'react';

export default function InputButton({
  value, handleNumberButtonClickInAssessment,
}) {
  return (
    <button
      type="button"
      onClick={handleNumberButtonClickInAssessment}
      value={value}
    >
      {value}
    </button>
  );
}
