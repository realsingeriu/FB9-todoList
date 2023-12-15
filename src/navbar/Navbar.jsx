import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { useAuthContext } from "../context/useAuthContext";
import styles from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const { dispatch, user } = useAuthContext();
  const logout = () => {
    signOut(auth)
      .then(() => {
        // console.log("유저 로그아웃");
        // 로그아웃 성공시 유저 스테이트 업데이트
        dispatch({ type: "LOGOUT" });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <nav className={styles.navbar}>
      <h1>My Todo List</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>환영합니다, {user.email}</li>
            <li>
              <Link to="/news">My News</Link>
            </li>
            <li>
              <button className="btn" onClick={logout}>
                로그아웃
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
