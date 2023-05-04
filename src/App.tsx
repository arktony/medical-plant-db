import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Admin from './components/Admin';

import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
