import { useState } from "react";

export default function BasicInfoRow(props) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [fieldValue, setFieldValue] = useState(props.fieldValue);

  function handleEditButton() {
    setIsBeingEdited(true);
  }

  function handleSaveButton() {
    setIsBeingEdited(false);
  }

  const displayInfo = (
    <tr>
      <td>
        <button onClick={handleEditButton}>edit</button>
      </td>
      <td>
        {props.fieldName}: {props.fieldValue}
      </td>
    </tr>
  );

  const editInfo = (
    <tr>
      <td>
        <button onClick={handleSaveButton}>save</button>
      </td>
      <td>
        <label htmlFor="field input">{props.fieldName}:</label>
        <input
          type="text"
          placeholder={fieldValue}
          value={fieldValue}
          onChange={(evt) => setFieldValue(evt.target.value)}
          name="field input"
          id="field input"
        ></input>
      </td>
    </tr>
  );

  return <> {isBeingEdited ? editInfo : displayInfo}</>;
}
