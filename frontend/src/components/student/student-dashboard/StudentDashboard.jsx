import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [problemSetInfo, setProblemSetInfo] = useState({});

  useEffect(() => {
    fetch(`/api/problem-set-info/${currentUser.current_problem_set}`)
      .then((response) => response.json())
      .then((data) => {
        setProblemSetInfo(data);
      });
  }, []);

  function handleLetsBeginClick() {
    navigate('/student/assessment');
  }

  return (
    <>
      <h2>
        Welcome,
        {' '}
        {currentUser.student_first_name}
        {' '}
        {currentUser.student_last_name}
        !
      </h2>

      <p>
        You are working on
        {' '}
        { problemSetInfo.problem_set_type}
        , Goal
        {' '}
        {problemSetInfo.problem_set_level}
        :
        {' '}
        { problemSetInfo.problem_set_name}
      </p>

      <p>Ready to practice?</p>

      <button type="button" onClick={handleLetsBeginClick}>Let&#39;s Begin!</button>
    </>
  );
}
