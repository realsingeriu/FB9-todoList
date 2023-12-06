import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_ACCESS_TODO_API_KEY,
  authDomain: "todolist-74cb4.firebaseapp.com",
  projectId: "todolist-74cb4",
  storageBucket: "todolist-74cb4.appspot.com",
  messagingSenderId: "957120130897",
  appId: "1:957120130897:web:f8acbb849b922d79dc2d70",
};

// 파이어베이스 초기 설정
const app = initializeApp(firebaseConfig);

// db 초기화
const db = getFirestore();

// 인증 초기화
const auth = getAuth();

export { db, auth };
