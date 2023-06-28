/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EducatorEmailEntry({
  emailEntered, setEmailEntered, setEducatorId, setEducatorInDB,
}) {
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch('/api/educator/lookup-educator-id', {
      method: 'POST',
      body: JSON.stringify({ email_entered: emailEntered }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.educator_id === null) {
          navigate('/educator/signup', {
            state: { emailEntered },
          });
        } else {
          setEducatorInDB(true);
          setEducatorId(data.educator_id);
        }
      });
  }

  return (
    <div className="EducatorLogin">
      <h2 className="educator-dark bold">Educators</h2>
      <h4>Log In or Sign Up</h4>
      <p>
        Not an educator?
        {' '}
        <Link to="/">&larr; go back</Link>
      </p>
      <div>
        <form className="EducatorLogin-form" onSubmit={handleSubmit}>
          <label htmlFor="EducatorLogin-educator-email">
            Enter your email address:
            {' '}
          </label>
          <input
            type="email"
            placeholder="email"
            value={emailEntered}
            onChange={(evt) => setEmailEntered(evt.target.value)}
            name="EducatorLogin-educator-email"
            id="EducatorLogin-educator-email"
            required
          />

          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}
