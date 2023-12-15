import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import "./TodoList.css";

export default function TodoList({ todos }) {
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
  };

  const handleSaveEdit = async () => {
    const { id, title } = editedTodo;

    // Update the todo with the new title
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { title });

    // Clear the editedTodo state after saving
    setEditedTodo({ id: "", title: "" });
  };

  const handleCancelEdit = () => {
    // Clear the editedTodo state if editing is canceled
    setEditedTodo({ id: "", title: "" });
  };

  return (
    <div className="todo-list">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
