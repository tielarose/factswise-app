import React, { useState } from 'react';
import ClassroomCodeEntry from './StudentLogin-Step1-ClassroomCodeEntry';
import StudentNameAndPassword from './StudentLogin-Step2-NameAndPassword';

export default function StudentLogin() {
  const [isValidClassroomCode, setIsValidClassroomCode] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [currentClassroom, setCurrentClassroom] = useState({});

  return (
    <>
      {!isValidClassroomCode ? (
        <div className="form-container">
          <ClassroomCodeEntry
            setIsValidClassroomCode={setIsValidClassroomCode}
            setAllStudents={setAllStudents}
            setCurrentClassroom={setCurrentClassroom}
          />
        </div>
      ) : (
        <StudentNameAndPassword
          allStudents={allStudents}
          currentClassroom={currentClassroom}
          setIsValidClassroomCode={setIsValidClassroomCode}
        />
      )}
    </>
  );
}
