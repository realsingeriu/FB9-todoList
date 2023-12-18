import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { useAuthContext } from "../context/useAuthContext";
import { signOut, updatePassword } from "firebase/auth";

const Profile = () => {
  const { dispatch, user } = useAuthContext();
  const [alert, setAlert] = useState("");
  const [newPassword, setNewPassword] = useState(""); // 새로운 비밀번호 state 추가
  const navigate = useNavigate();

  const { auth } = user; // auth 속성을 사용할 때는 먼저 확인

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

  const changepassword = async () => {
    if (!newPassword) {
      setAlert("새로운 비밀번호를 입력하세요.");
      return;
    }

    try {
      await updatePassword(user, newPassword);
      setAlert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      setAlert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["edit-profile-wrapper"]}>
        <h2 className={styles["edit-profile-header"]}>프로필 수정</h2>
        <div className={styles.alert}>{alert}</div>
        <form className={styles["display-name-wrapper"]}>
          <h3 className={styles["form-header"]}>{user.email}</h3>
        </form>
        <form className={styles["password-wrapper"]}>
          <h3 className={styles["form-header"]}>비밀번호 재설정</h3>

          {/* input 엘리먼트 추가 */}
          <input
            type="password"
            placeholder="새로운 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles["Profile__password-input"]}
          />

          {/* button 엘리먼트 수정 */}
          <button
            type="button"
            onClick={changepassword}
            className={styles["Profile__password"]}
          >
            비밀번호 변경
          </button>
        </form>
        <div className={styles["btn-wrapper"]}>
          {/* button 엘리먼트 수정 */}
          <button
            type="button"
            onClick={logout}
            className={styles["Profile__log-out"]}
          >
            로그아웃
          </button>
        </div>
      </div>
      <hr className={styles.line} />
    </div>
  );
};

export default Profile;
