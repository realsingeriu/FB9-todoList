import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function TodoList({ todos }) {
  const handleClick = async (id, title) => {
    const shouldDelete = window.confirm(`"${title}" 항목을 삭제하시겠습니까?`);

    if (shouldDelete) {
      const ref = doc(db, "todos", id);
      await deleteDoc(ref);
    }
  };

  return (
    <div className="todo-list">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => handleClick(todo.id, todo.title)}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
