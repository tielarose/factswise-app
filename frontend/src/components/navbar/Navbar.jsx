import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import React, { useContext } from 'react';
import { AppContext } from '../Context';

// eslint-disable-next-line react/prop-types
export default function Navbar() {
  const navigate = useNavigate();
  const allContext = useContext(AppContext);
  const { currentUser, isEducator, setCurrentUser, setIsEducator,setIsStudent } = allContext;

  function handleLogOut() {
    localStorage.clear();
    setCurrentUser(null);
    setIsEducator(false);
    setIsStudent(false);
    navigate('/');
  }
  return (
    // { isLoggedOut && <NavbarLoggedOut />}
    // { isStudent && <NavbarStudent /> }
    // { isEducator && <NavbarEducator/> }
    <div className="Navbar">
      <Link to="/">MathFacts Home</Link>
      {isEducator ? <Link to="/educator/home">Dashboard</Link> : ''}
      {currentUser != null ? (
        <button
          type="button"
          onClick={handleLogOut}
        >
          Log Out

        </button>
      ) : (
        <Link to="/">Log In</Link>
      )}
    </div>
  );
}
