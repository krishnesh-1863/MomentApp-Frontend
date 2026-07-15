
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";



const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await api.post("/api/auth/login", formData);
        
        alert("Login Successful");

        navigate("/feed");

    } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
    }
};
  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-100">
        
      <div className="bg-white p-8 rounded-xl shadow-lg w-100"  >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form  onSubmit={handleSubmit} action="">
            <input className="w-full border border-gray-300 rounded-lg p-3 mb-4 " type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required/>
            <input className="w-full border border-gray-300 rounded-lg p-3 mb-4 " type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required/>
            <button type="submit"  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Login</button>
            <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600">
                    Register
                </Link>
            </p>
        </form>
      </div>
    </div>
  );
};

export default Login;