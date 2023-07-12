import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context';
import AssessmentCompleteScreen from './AssessmentCompleteScreen';
import AssessmentQuestions from './AssessmentQuestions';

export default function Assessment() {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [problemSetQuestions, setProblemSetQuestions] = useState([]);
  const [assessmentIsComplete, setAssessmentIsComplete] = useState(false);

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
          <AssessmentQuestions
            problemSetQuestions={problemSetQuestions}
            setHasAnsweredAllQuestions={setAssessmentIsComplete}
          />
        )}
    </div>

  );
}
