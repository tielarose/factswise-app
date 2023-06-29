import React, { useState } from 'react';
import ClassroomCodeEntry from './StudentLogin-Step1-ClassroomCodeEntry';
import StudentNameAndPassword from './StudentLogin-Step2-NameAndPassword';

export default function StudentLogin() {
  const [isValidClassroomCode, setIsValidClassroomCode] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [currentClassroom, setCurrentClassroom] = useState({});

  return (
    <div className="form-container">
      {!isValidClassroomCode ? (
        <ClassroomCodeEntry
          setIsValidClassroomCode={setIsValidClassroomCode}
          setAllStudents={setAllStudents}
          setCurrentClassroom={setCurrentClassroom}
        />
      ) : (
        <StudentNameAndPassword
          allStudents={allStudents}
          currentClassroom={currentClassroom}
          setIsValidClassroomCode={setIsValidClassroomCode}
        />
      )}
    </div>
  );
}
