import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import "./TodoList.css";
import { useState } from "react";
import EditForm from "./EditForm";

export default function TodoList({ todos }) {
  const [editedTodo, setEditedTodo] = useState({ id: "", title: "" });
  const [editMode, setEditMode] = useState(false);

  const handleClick = async (id, title) => {
    const shouldDelete = window.confirm(`"${title}" 항목을 삭제하시겠습니까?`);

    if (shouldDelete) {
      const ref = doc(db, "todos", id);
      await deleteDoc(ref);
    }
  };
  const handleEdit = (id, title) => {
    // Set the editedTodo state to enable editing
    setEditedTodo({ id, title });
    setEditMode(true);
  };

  const handleSaveEdit = async (id, newTitle) => {
    // const { id, title } = editedTodo;
    // console.log(editedTodo);

    // Update the todo with the new title
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, {
      title: newTitle,
    });

    // Clear the editedTodo state after saving
    setEditedTodo({ id: "", title: "" });
  };

  const handleCancelEdit = () => {
    // Clear the editedTodo state if editing is canceled
    setEditedTodo({ id: "", title: "" });
    setEditMode(false);
  };

  return (
    <div className="todo-list">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editMode && editedTodo.id === todo.id ? (
              <EditForm
                editedTodo={editedTodo}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                할일 : {todo.title}
                <div style={{ marginBottom: "10px" }}></div>
                <hr></hr>
                <div className="buttons-container">
                  <button
                    className="button"
                    onClick={() => handleEdit(todo.id, todo.title)}
                  >
                    수정
                  </button>
                  <button
                    className="button"
                    onClick={() => handleClick(todo.id, todo.title)}
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
