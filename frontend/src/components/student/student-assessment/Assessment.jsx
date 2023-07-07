import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context';
import AssessmentQuestions from './AssessmentQuestions';

export default function Assessment() {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [problemSetQuestions, setProblemSetQuestions] = useState([]);
  const [hasAnsweredAllQuestions, setHasAnsweredAllQuestions] = useState(false);

  useEffect(() => {
    fetch(`/api/problem-set-questions/${currentUser.current_problem_set}`)
      .then((response) => response.json())
      .then((data) => {
        setProblemSetQuestions(data.problem_set_questions);
      });
  }, []);

  return (
    <div>
      {hasAnsweredAllQuestions
        ? (<p> Congratulations! You&#39;re done!</p>)
        : (
          <AssessmentQuestions
            problemSetQuestions={problemSetQuestions}
            setHasAnsweredAllQuestions={setHasAnsweredAllQuestions}
          />
        )}
    </div>

  );
}
