/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context';

export default function EducatorPasswordEntry({
  educatorId, setEducatorInDB, setEmailEntered, emailEntered,
}) {
  const navigate = useNavigate();
  const { setCurrentUser, setIsEducator } = useContext(AppContext);
  const [enteredPassword, setEnteredPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch('/api/educator/verify-educator-password', {
      method: 'POST',
      body: JSON.stringify({
        educator_id: educatorId,
        entered_password: enteredPassword,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login_successful) {
          localStorage.setItem('userId', data.user_info.educator_id);
          setCurrentUser(data.user_info);
          setIsEducator(data.is_educator);
          navigate('/educator/home');
        } else {
          setEnteredPassword('');
        }
      });
  }

  return (
    <div className="EducatorLogin step2">
      <h2>
        Welcome back,
        {' '}
        {emailEntered}
        !
      </h2>
      <h4>
        <button
          type="button"
          onClick={() => {
            setEducatorInDB(false);
            setEmailEntered('');
            navigate('/educator/login');
          }}
        >
          Not you?
        </button>
      </h4>

      <div>
        <form className="EducatorLogin-form" onSubmit={handleSubmit}>
          <label htmlFor="EducatorLogin-educator-password">
            Password:
            <input
              type="password"
              placeholder="password"
              value={enteredPassword}
              onChange={(evt) => setEnteredPassword(evt.target.value)}
              name="EducatorLogin-educator-Password"
              id="EducatorLogin-educator-password"
              required
            />

          </label>

          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}
