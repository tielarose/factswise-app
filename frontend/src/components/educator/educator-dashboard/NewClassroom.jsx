import { useNavigate, Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context';

export default function NewClassroom() {
  const navigate = useNavigate();
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [classroomName, setClassroomName] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    const formInputs = {
      educator_id: currentUser.educator_id,
      educator_last_name: currentUser.educator_last_name,
      classroom_name: classroomName,
    };

    fetch('/api/educator/new/classroom', {
      method: 'POST',
      body: JSON.stringify(formInputs),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/educator/home');
      });
  }

  return (
    <div className="form-container">
      <h2 className="educator-dark bold">Create a New Classroom</h2>
      <div>
        <form onSubmit={handleSubmit}>
          {/* Classroom Name Field */}
          <label htmlFor="NewStudent-classroom-name">
            Classroom Name:
          </label>
          <input
            type="text"
            placeholder="classroom name"
            value={classroomName}
            onChange={(evt) => setClassroomName(evt.target.value)}
            name="NewStudent-classroom-name"
            id="NewStudent-classroom-name"
            required
          />

          <button className="button-blue margin-top-10px" type="button">Add Classroom</button>
          <Link className="link-blue margin-top-10px" to="/educator/home">cancel</Link>
        </form>
      </div>
    </div>
  );
}
