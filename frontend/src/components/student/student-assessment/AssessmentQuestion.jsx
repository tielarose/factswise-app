/* eslint-disable react/prop-types */
import React from 'react';

export default function AssessmentQuestion({ question, inputAnswer }) {
  return (
    <div className="AssessmentQuestion">
      <h5>
        {question?.question_text}
        { ' ' }
        {' '}
        =
        {' '}
        { ' ' }
      </h5>
      <div className="response-div">
        <h5>{ inputAnswer }</h5>
      </div>
    </div>
  );
}
