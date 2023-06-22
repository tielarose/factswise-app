import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context';
import AssessmentQuestions from './AssessmentQuestions';
import './Assessment.css';

export default function Assessment() {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [problemSetQuestions, setProblemSetQuestions] = useState([]);
  const [hasAnsweredAllQuestions, setHasAnsweredAllQuestions] = useState(false);

  console.log('Assessments component was rendered');
  console.log(currentUser)
  console.log(problemSetQuestions[4], problemSetQuestions[5])

  useEffect(() => {
    fetch(`/api/problem-set-questions/${currentUser.current_problem_set}`)
      .then((response) => response.json())
      .then((data) => {
        setProblemSetQuestions(data.problem_set_questions);
      });
  }, []);

  return (
    <div className="Assessment">
      {hasAnsweredAllQuestions
        ? (<p> Congratulations! You&#39;re done!</p>)
        : (
          <AssessmentQuestions
            problemSetQuestions={problemSetQuestions}
            setHasAnsweredAllQuestions={ setHasAnsweredAllQuestions}
          />
        )}
    </div>

  );
}
