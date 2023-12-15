import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";
import { useAuthContext } from "../context/useAuthContext";
import "./MynewsForm.css";

export default function MynewsForm() {
  const [newNewsTitle, setNewNewsTitle] = useState("");
  const [newNewsContent, setNewNewsContent] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ref = collection(db, "news");

    await addDoc(ref, {
      title: newNewsTitle,
      content: newNewsContent,
      uid: user.uid,
    });

    // 입력 후에 입력 필드 초기화
    setNewNewsTitle("");
    setNewNewsContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        <span>제목:</span>
        <input
          required
          type="text"
          onChange={(e) => setNewNewsTitle(e.target.value)}
          value={newNewsTitle}
        />
      </label>
      <label>
        <span>내용:</span>
        <textarea
          required
          onChange={(e) => setNewNewsContent(e.target.value)}
          value={newNewsContent}
        />
      </label>
      <button>추가</button>
    </form>
  );
}
