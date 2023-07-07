/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import StudentNameSelection from './StudentLogin-Step2a-NameSelection';
import StudentPasswordEntry from './StudentLogin-Step2b-PasswordEntry';

export default function StudentNameAndPassword(
  { setIsValidClassroomCode, allStudents, currentClassroom },
) {
  const [currentStudent, setCurrentStudent] = useState({ student_id: null });

  return (
    <>
      { currentStudent.student_id === null ? (
        <StudentNameSelection
          setCurrentStudent={setCurrentStudent}
          setIsValidClassroomCode={setIsValidClassroomCode}
          currentClassroom={currentClassroom}
          allStudents={allStudents}
        />
      ) : (
        <div className="form-container">
          <StudentPasswordEntry
            currentStudent={currentStudent}
            setCurrentStudent={setCurrentStudent}
          />
        </div>
      )}
    </>
  );
}
