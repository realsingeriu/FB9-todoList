import { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Home() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const ref = collection(db, "todos");

    // todos 컬렉션에 모든 문서들을 가져오기
    getDocs(ref).then((snapshot) => {
      let results = [];
      // 성공시 snapshot.docs에 모든 문서들이 들어있음
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
