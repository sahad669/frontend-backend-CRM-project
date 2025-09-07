import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white flex items-center justify-between px-6 pb-3 py-3 shadow-md z-50">
      {/* Left side: Title */}
      <div className="text-xl font-semibold cursor-pointer" onClick={() => navigate("/customers")}>
        Customers
      </div>

      {/* Right side: Login or Logout button */}
      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 px-4 py-1 rounded hover:bg-green-600 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

