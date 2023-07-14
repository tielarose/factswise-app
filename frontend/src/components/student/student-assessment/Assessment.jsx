import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context';
import AssessmentCompleteScreen from './AssessmentCompleteScreen';
import AssessmentContainer from './AssessmentContainer';
import BaselineTimerContainer from './BaselineTimerContainer';

export default function Assessment() {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [problemSetQuestions, setProblemSetQuestions] = useState([]);
  const [baselineQuestions, setBaselineQuestions] = useState([]);
  const [assessmentIsComplete, setAssessmentIsComplete] = useState(false);
  const [baselineIsComplete, setBaselineIsComplete] = useState(false);
  const [baselineTime, setBaselineTime] = useState(null);

  // fetch a randomized 5 baseline questions
  useEffect(() => {
    fetch('/api/baseline-questions')
      .then((response) => response.json())
      .then((data) => {
        setBaselineQuestions(data.baseline_questions);
      });
  }, []);

  // fetch all problem set questions for logged in student's current problem set
  useEffect(() => {
    fetch(`/api/problem-set-questions/${currentUser.current_problem_set}`)
      .then((response) => response.json())
      .then((data) => {
        setProblemSetQuestions(data.problem_set_questions);
      });
  }, []);

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
    componentToDisplay = (
      <BaselineTimerContainer
        baselineQuestions={baselineQuestions}
        setBaselineTime={setBaselineTime}
        setBaselineIsComplete={setBaselineIsComplete}
      />
    );
  }

  return (
    <div>
      {componentToDisplay}
    </div>

  );
}
