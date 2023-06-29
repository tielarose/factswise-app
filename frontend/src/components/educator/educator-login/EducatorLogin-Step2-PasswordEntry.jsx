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
    <>
      <h4>
        Welcome back,
      </h4>
      <h2 className="educator-dark bold">
        {emailEntered}
        !
      </h2>
      <div>
        <button
          className="link-blue"
          type="button"
          onClick={() => {
            setEducatorInDB(false);
            setEmailEntered('');
            navigate('/educator/login');
          }}
        >
          Not you?
        </button>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="EducatorLogin-educator-password">
            Enter your password:
          </label>
          <input
            type="password"
            placeholder="password"
            value={enteredPassword}
            onChange={(evt) => setEnteredPassword(evt.target.value)}
            name="EducatorLogin-educator-Password"
            id="EducatorLogin-educator-password"
            required
          />

          <button className="button-blue" type="submit">Next</button>
        </form>
      </div>
    </>
  );
}
