import { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthContext } from "../context/useAuthContext";

export default function Home() {
  const [todos, setTodos] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const ref = collection(db, "todos");
    const q = query(ref, where("uid", "==", user.uid));
    // todos 컬렉션에 모든 문서들을 가져오기
    const unsub = onSnapshot(q, (snapshot) => {
      let results = [];
      // 성공시 snapshot.docs에 모든 문서들이 들어있음
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setTodos(results);
    });
    return () => unsub();
  }, []);

  return (
    <div className="App">
      {todos && <TodoList todos={todos} />}
      <TodoForm />
    </div>
  );
}
