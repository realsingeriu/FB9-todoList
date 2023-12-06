import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";
import { useAuthContext } from "../context/useAuthContext";

export default function TodoForm() {
  const [newTodo, setNewTodo] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = collection(db, "todos");

    await addDoc(ref, {
      title: newTodo,
      uid: user.uid,
    });

    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>새 할일 :</span>
        <input
          required
          type="text"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
      </label>
      <button>추가</button>
    </form>
  );
}
