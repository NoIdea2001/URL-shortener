import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css'

function App() {
  const checkAuthenticated = () => {
    if (localStorage.token && localStorage.loggedInUser) {
      return true;
    }
    return false;
  };
  const [authenticated, setAuthenticated] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setAuthenticated(checkAuthenticated());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/login"
          element={
            <Login setToken={setToken} setAuthenticated={setAuthenticated} />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <Home
              authenticated={authenticated}
              token={token}
              setToken={setToken}
              setAuthenticated={setAuthenticated}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
