import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";

export default function Navbar() {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("유저 로그아웃");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <nav>
      <h1>My Todo List</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li onClick={logout}>Logout</li>
      </ul>
    </nav>
  );
}
