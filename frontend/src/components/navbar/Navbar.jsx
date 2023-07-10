import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import React, { useContext } from 'react';
import LogoBlue from '../../assets/arithmetic-symbols-blue.png';
import { AppContext } from '../Context';

// eslint-disable-next-line react/prop-types
export default function Navbar() {
  const navigate = useNavigate();
  const allContext = useContext(AppContext);
  const {
    currentUser, setCurrentUser, isEducator, setIsEducator, isStudent, setIsStudent,
  } = allContext;

  function handleLogOut() {
    localStorage.clear();
    setCurrentUser(null);
    setIsEducator(false);
    setIsStudent(false);
    navigate('/');
  }
  return (
    <div className={`Navbar ${isEducator ? 'educator' : ''} ${isStudent ? 'student' : ''}`}>
      <div className="home-logo">
        <Link className="educator-dark bold" to="/">
          <img src={LogoBlue} className="Navbar-logo" alt="MathFacts logo" />
          {' '}
          {' '}
        </Link>
        <Link className="educator-dark bold home-logo-text" to="/">
          MathFacts Home
        </Link>
      </div>

      {isEducator ? <div><Link className="educator-dark bold" to="/educator/home">Dashboard</Link></div> : ''}
      {isStudent ? <div><Link className="educator-dark bold" to="/student/home">Dashboard</Link></div> : ''}
      {isEducator ? (
        <div className="educator-dark">
          Logged in as
          {' '}
          {currentUser.educator_first_name}
          {' '}
          { currentUser.educator_last_name}
        </div>
      ) : ''}
      {isStudent ? (
        <div>
          Logged in as
          {' '}
          {currentUser.student_first_name}
          {' '}
          { currentUser.student_last_name}
        </div>
      ) : ''}
      {currentUser != null ? (
        <div>
          <button
            type="button"
            onClick={handleLogOut}
            className={`${isStudent ? 'button-yellow' : 'button-blue'}`}
          >
            Log Out

          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => navigate('/')}
          className="button-blue"
        >
          Log In

        </button>
      )}
    </div>
  );
}
