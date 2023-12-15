import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import "./MynewsList.css";

export default function MynewsList({ news }) {
  const handleClick = async (id, title) => {
    const shouldDelete = window.confirm(`"${title}" 항목을 삭제하시겠습니까?`);

    if (shouldDelete) {
      const ref = doc(db, "news", id);
      await deleteDoc(ref);
    }
  };

  return (
    <div className="news-list">
      <ul>
        {news.map((news) => (
          <li key={news.id} onClick={() => handleClick(news.id, news.title)}>
            {news.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
