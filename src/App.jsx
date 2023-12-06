import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./context/useAuthContext";
import Footer from "./footer/footer";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/signup" element={!user ? <Signup /> : <Home />} />
            <Route path="/login" element={!user ? <Login /> : <Home />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}
export default App;
