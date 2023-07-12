import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context';
import AssessmentCompleteScreen from './AssessmentCompleteScreen';
import AssessmentContainer from './AssessmentContainer';

export default function Assessment() {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [problemSetQuestions, setProblemSetQuestions] = useState([]);
  const [assessmentIsComplete, setAssessmentIsComplete] = useState(false);

  // fetch all problem set questions for logged in student's current problem set
  useEffect(() => {
    fetch(`/api/problem-set-questions/${currentUser.current_problem_set}`)
      .then((response) => response.json())
      .then((data) => {
        setProblemSetQuestions(data.problem_set_questions);
      });
  }, []);

  return (
    <div>
      {assessmentIsComplete
        ? (<AssessmentCompleteScreen />
        )
        : (
          <AssessmentContainer
            problemSetQuestions={problemSetQuestions}
            setHasAnsweredAllQuestions={setAssessmentIsComplete}
          />
        )}
    </div>

  );
}
