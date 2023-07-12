import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context';

export default function AssessmentCompleteScreen() {
  const navigate = useNavigate();
  const allContext = useContext(AppContext);
  const {
    setCurrentUser, setIsStudent, setIsEducator,
  } = allContext;

  function handleLogOut() {
    localStorage.clear();
    setCurrentUser(null);
    setIsEducator(false);
    setIsStudent(false);
    navigate('/');
  }

  return (
    <div className="form-container">
      <h2 className="bold"> Congratulations! You&#39;re done!</h2>
      <button type="button" className="button-yellow" id="student-logout-button" onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
