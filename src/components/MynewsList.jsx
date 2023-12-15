import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import "./MynewsList.css";

export default function MynewsList({ news }) {
  const handleClick = async (id, title, content) => {
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
          <li key={news.id} className="news-item">
            <div>
              <p>제목: {news.title}</p>
              <hr />
              <p>내용: {news.content}</p>
            </div>
            <button
              className="add-button"
              onClick={() => handleEditer(news.id, news.title, news.content)}
            >
              수정
            </button>
            <button
              className="add-button"
              onClick={() => handleClick(news.id, news.title, news.content)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
