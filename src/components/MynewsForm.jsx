import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";
import { useAuthContext } from "../context/useAuthContext";

export default function MynewsForm() {
  const [newNews, setNewNews] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = collection(db, "news");

    await addDoc(ref, {
      title: newNews,
      uid: user.uid,
    });

    setNewNews("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>추가할 뉴스 :</span>
        <input
          required
          type="text"
          onChange={(e) => setNewNews(e.target.value)}
          value={newNews}
        />
      </label>
      <button>추가</button>
    </form>
  );
}
