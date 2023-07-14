import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context';
import AssessmentCompleteScreen from './AssessmentCompleteScreen';
import AssessmentContainer from './AssessmentContainer';

export default function Assessment() {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [problemSetQuestions, setProblemSetQuestions] = useState([]);
  const [assessmentIsComplete, setAssessmentIsComplete] = useState(false);
  const [baselineIsComplete, setBaselineIsComplete] = useState(false);
  const [baselineTime, setBaselineTime] = useState(null);

  // fetch all problem set questions for logged in student's current problem set
  useEffect(() => {
    fetch(`/api/problem-set-questions/${currentUser.current_problem_set}`)
      .then((response) => response.json())
      .then((data) => {
        setProblemSetQuestions(data.problem_set_questions);
      });
  }, []);

  function handleClick() { 
    setBaselineIsComplete(!baselineIsComplete);
  }

  let componentToDisplay;

  if (baselineIsComplete && assessmentIsComplete) {
    componentToDisplay = (<AssessmentCompleteScreen />);
  } else if (baselineIsComplete) {
    componentToDisplay = (
      <AssessmentContainer
        problemSetQuestions={problemSetQuestions}
        setHasAnsweredAllQuestions={setAssessmentIsComplete}
        baselineTime={baselineTime}
      />
    );
  } else {
    componentToDisplay = (<p>this will be the baseline timer component</p>);
  }

  return (
    <div>
      {componentToDisplay}
      <button type="button" onClick={handleClick}>Click me</button>
    </div>

  );
}
