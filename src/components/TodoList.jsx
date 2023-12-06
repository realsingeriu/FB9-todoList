import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function TodoList({ todos }) {
  const handleClick = async (id) => {
    const ref = doc(db, "todos", id);
    await deleteDoc(ref);
  };

  return (
    <div className="todo-list">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => handleClick(todo.id)}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
