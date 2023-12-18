import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./navbar/Navbar";
import { useAuthContext } from "./context/useAuthContext";
import News from "./pages/MyNews";
import Footer from "./footer/footer";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <div style={{ marginBottom: "50px" }}></div>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/news" element={<News />} />
          </Routes>
          <div style={{ marginBottom: "100px" }}></div>
          <div className="footer-container">
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}
export default App;
