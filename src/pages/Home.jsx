import { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Home() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const ref = collection(db, "todos");

    getDocs(ref).then((snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setTodos(results);
    });
  }, []);

  return (
    <div className="App">
      {todos && <TodoList todos={todos} />}
      <TodoForm />
    </div>
  );
}
