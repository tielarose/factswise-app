/* eslint-disable react/prop-types */
import React from 'react';

export default function AssessmentCompleteScreen(
  { setBaselineIsComplete, setDisplayBaselineCompleteMessage },
) {
  function handleClick() {
    setBaselineIsComplete(true);
    setDisplayBaselineCompleteMessage(false);
  }

  return (
    <div className="form-container">
      <h2 className="bold"> Great job!</h2>
      <h2 className="bold"> Now let&#39;s do some math problems!</h2>
      <button type="button" className="button-yellow" id="student-logout-button" onClick={handleClick}>Let&#39;s go!</button>
    </div>
  );
}
