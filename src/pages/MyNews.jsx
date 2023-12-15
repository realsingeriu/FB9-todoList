import { useEffect, useState } from "react";
import MynewsList from "../components/MynewsList";
import MynewsForm from "../components/MynewsForm";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthContext } from "../context/useAuthContext";

export default function MyNews() {
  const [news, setNews] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const ref = collection(db, "news");
    const q = query(ref, where("uid", "==", user.uid));
    // news 컬렉션에 모든 문서들을 가져오기
    const unsub = onSnapshot(q, (snapshot) => {
      let results = [];
      // 성공시 snapshot.docs에 모든 문서들이 들어있음
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setNews(results);
    });
    return () => unsub();
  }, []);

  return (
    <div className="App">
      {news && <MynewsList news={news} />}
      <MynewsForm />
    </div>
  );
}
