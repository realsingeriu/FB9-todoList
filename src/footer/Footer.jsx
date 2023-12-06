import React from "react";
import styles from "../footer/footer.module.css";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  const email = "realsingeriu12@naver.com";
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h3>Todo List</h3>
          <p>자신의 할 일을 적어봐요 </p>
          <p>
            firebase, firestore로 만든 todoList
            <li>1. 네비게이션 가드 </li>
            <li>2. 인증 컨텍스트 (Auth Context)</li>
            <li>3. query쿼리를 이용한 uid 출력</li>
          </p>
        </div>
        <div className={styles.contact}>
          <h2>문의사항</h2>
          <p style={{ fontSize: "30px" }}>
            Email:
            <a href={`mailto:${email}`}>
              <IoMdMail
                style={{ fontSize: "30px", color: "white" }}
                className="icon"
              />
            </a>
          </p>
          <p style={{ fontSize: "30px" }}>
            깃허브 링크:
            <a
              href="https://www.github.com/realsingeriu/my-money"
              target="_blank"
            >
              <FaGithub
                className="icon"
                style={{ fontSize: "30px", color: "white" }}
              />
            </a>
          </p>
          <p>전화번호: 123-456-7890</p>
        </div>
      </div>
      <div className={styles.copyRight}>
        <p>&copy; 2023 To Do List App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
