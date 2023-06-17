import { useState, useEffect } from "react";
import BasicInfoRow from "./BasicInfoRow";

export default function BasicInfo(props) {
  const [currentStudent, setCurrentStudent] = useState({});

  useEffect(() => {
    fetch(`/api/educator/studentinfo/${props.student_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentStudent(data.student_info);
      });
  }, []);

  const studentFullName = `${currentStudent.student_first_name} ${currentStudent.student_last_name}`;

  //   translate grade # to grade level

  return (
    <>
      <table>
        <BasicInfoRow fieldName="Name" fieldValue={studentFullName} />
        <BasicInfoRow
          fieldName="Grade"
          fieldValue={currentStudent.student_grade_level}
        />
        <BasicInfoRow
          fieldName="Current Goal"
          fieldValue={currentStudent.current_problem_set}
        />
      </table>
    </>
  );
}
