import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Customer from "./components/Customer"
import Logged from "./protectedRoutes/Logged"
const app = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={
          <Logged>
            <Customer />
          </Logged>
        } />

      </Routes>
    </div>
  )
}

export default app