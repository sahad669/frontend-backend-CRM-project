import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">CRM Home Page</h1>
      <Link to="/login" className="text-blue-500 hover:underline mb-2">Login</Link>
      <Link to="/register" className="text-blue-500 hover:underline mb-2">Register</Link>
      <Link to="/customers" className="text-blue-500 hover:underline mb-2">View Customers</Link>
    </div>
  );
};

export default Home;
