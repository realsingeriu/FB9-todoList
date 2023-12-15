import { useState } from "react";

const EditForm = ({ editedTodo, onSave, onCancel }) => {
  const [newTitle, setNewTitle] = useState(editedTodo.title);

  const handleSaveEdit = () => {
    // console.log(editedTodo.id, newTitle);
    onSave(editedTodo.id, newTitle);
  };

  return (
    <div>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={handleSaveEdit}>저장</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};

export default EditForm;
