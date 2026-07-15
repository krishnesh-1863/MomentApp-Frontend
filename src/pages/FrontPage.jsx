import React from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-10 w-95 text-center">

        <h1 className="text-4xl font-bold text-blue-600">
          Moment Maker
        </h1>

        <p className="text-gray-500 mt-2">
          Share your memories with everyone.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-8 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="w-full mt-4 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Register
        </button>

      </div>
    </div>
  );
};

export default FrontPage;