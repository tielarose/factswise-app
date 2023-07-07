import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context';
import AssessmentQuestions from './AssessmentQuestions';

export default function Assessment() {
  const navigate = useNavigate();
  const allContext = useContext(AppContext);
  const { currentUser, setCurrentUser, setIsStudent, setIsEducator } = allContext;
  const [problemSetQuestions, setProblemSetQuestions] = useState([]);
  const [hasAnsweredAllQuestions, setHasAnsweredAllQuestions] = useState(false);

  useEffect(() => {
    fetch(`/api/problem-set-questions/${currentUser.current_problem_set}`)
      .then((response) => response.json())
      .then((data) => {
        setProblemSetQuestions(data.problem_set_questions);
      });
  }, []);

  function handleLogOut() {
    localStorage.clear();
    setCurrentUser(null);
    setIsEducator(false);
    setIsStudent(false);
    navigate('/');
  }

  return (
    <div>
      {hasAnsweredAllQuestions
        ? (
          <div className="form-container">
            <h2 className="bold"> Congratulations! You&#39;re done!</h2>
            <button type="button" className="button-yellow" id="student-logout-button" onClick={handleLogOut}>Log Out</button>
          </div>
        )
        : (
          <AssessmentQuestions
            problemSetQuestions={problemSetQuestions}
            setHasAnsweredAllQuestions={setHasAnsweredAllQuestions}
          />
        )}
    </div>

  );
}
