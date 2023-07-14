/* eslint-disable react/prop-types */
import React from 'react';

export default function InputButton({
  value, handleNumberButtonClick,
}) {
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
