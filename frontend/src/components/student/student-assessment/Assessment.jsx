import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../Context';

export default function Assessment() {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;

  useEffect(() => {
    fetch(`/api/problem-set-questions/${currentUser.current_problem_set}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.problem_set_questions);
      });
  }, []);

  return <p>{currentUser.current_problem_set }</p>;
}
