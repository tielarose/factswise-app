import { useState, useEffect } from "react";

export default function BasicInfo(props) {
  const [currentStudent, setCurrentStudent] = useState({});
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  // get information on the current student from the server
  useEffect(() => {
    fetch(`/api/educator/studentinfo/${props.student_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentStudent(data.student_info);
      });
  }, []);

  // this might become a global variable at some point?
  const numToGradeDict = {
    0: "Kindergarten",
    1: "First Grade",
    2: "Second Grade",
    3: "Third Grade",
    4: "Fourth Grade",
    5: "Fifth Grade"
  };

  const displayInfo = (
    <table>
      <tbody>
        <tr>
          <td>First Name: {currentStudent.student_first_name}</td>
        </tr>
        <tr>
          <td>Last Name: {currentStudent.student_last_name}</td>
        </tr>
        <tr>
          <td>
            Grade Level: {numToGradeDict[currentStudent.student_grade_level]}
          </td>
        </tr>
        <tr>
          <td>Current Goal: {currentStudent.current_problem_set}</td>
        </tr>
        <tr>
          <td>
            <button onClick={handleEditButton}>edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  );

  let editableInfo = (
    <table>
      <tbody>
        <tr>
          <td>
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={currentStudent.student_first_name}
              placeholder={currentStudent.student_first_name}
              onChange={(evt) =>
                handleFieldChange("student_first_name", evt.target.value)
              }
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={currentStudent.student_last_name}
              placeholder={currentStudent.student_last_name}
              onChange={(evt) =>
                handleFieldChange("student_last_name", evt.target.value)
              }
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="grade-level">Grade Level</label>
            <input
              type="text"
              id="grade-level"
              value={currentStudent.student_grade_level}
              placeholder={currentStudent.student_grade_level}
              onChange={(evt) =>
                handleFieldChange("student_grade_level", evt.target.value)
              }
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="goal">Current Goal</label>
            <input
              type="text"
              id="goal"
              value={currentStudent.current_problem_set}
              placeholder={currentStudent.current_problem_set}
              onChange={(evt) =>
                handleFieldChange("current_problem_set", evt.target.value)
              }
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={handleSaveButton}>save</button>
          </td>
        </tr>
      </tbody>
    </table>
  );

  function handleEditButton() {
    setIsBeingEdited(true);
  }

  function handleFieldChange(field, newValue) {
    const newStudentInfo = { ...currentStudent };
    newStudentInfo[field] = newValue;
    setCurrentStudent(newStudentInfo);
  }

  function handleSaveButton() {
    fetch("/api/educator/updatestudent", {
      method: "POST",
      body: JSON.stringify(currentStudent),
      headers: { "Content-Type": "application/json" }
    })
      .then((data) => data.json())
      .then((response) => console.log(response));

    setIsBeingEdited(false);
  }

  return <>{isBeingEdited ? editableInfo : displayInfo}</>;
}
