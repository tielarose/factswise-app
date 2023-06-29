import React, { useState, useContext } from 'react';
import EducatorEmailEntry from './EducatorLogin-Step1-EmailEntry';
import EducatorPasswordEntry from './EducatorLogin-Step2-PasswordEntry';
import { AppContext } from '../../Context';

export default function EducatorLogin() {
  const [emailEntered, setEmailEntered] = useState('');
  const [educatorInDB, setEducatorInDB] = useState(false);
  const [educatorId, setEducatorId] = useState('');
  const allContext = useContext(AppContext);
  const { setCurrentUser, setIsEducator } = allContext;

  return (
    <div className="form-container">
      {!educatorInDB ? (
        <EducatorEmailEntry
          setEducatorInDB={setEducatorInDB}
          emailEntered={emailEntered}
          setEmailEntered={setEmailEntered}
          setEducatorId={setEducatorId}
        />
      ) : (
        <EducatorPasswordEntry
          emailEntered={emailEntered}
          setEmailEntered={setEmailEntered}
          educatorId={educatorId}
          setEducatorInDB={setEducatorInDB}
          setCurrentUser={setCurrentUser}
          setIsEducator={setIsEducator}
        />
      )}
    </div>
  );
}
