import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleError, handleSuccess } from "./util";


function Signup() {
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const Navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name Email and Password are Required");
    }
    try {
      const url = `${import.meta.env.VITE_BACKEND_LINK}auth/signup/`;
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      if (result.error) {
        return handleError(result.error.details[0].message);
      }
      if (result.success == false) {
        return handleError(result.message);
      }
      setTimeout(()=>{
        Navigate('/login')
      },1000)
      return handleSuccess("Signup Successful");

    } catch (error) {
      console.log(error);
      return handleError("Server Error");
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
    <h1 className="text-3xl font-bold text-white mb-6">Sign Up</h1>
    <form 
      onSubmit={handleSignup} 
      className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
    >
      
      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
        <input
          type="text"
          name="name"
          autoFocus
          onChange={handleChange}
          placeholder="Enter your name"
          value={signupInfo.name}
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
          value={signupInfo.email}
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Enter your Password"
          value={signupInfo.password}
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full py-3 mt-4 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      >
        Signup
      </button>

      {/* Link to Login */}
      <span className="block text-gray-300 text-center mt-4">
        Already have an account? 
        <Link to="/login" className="text-blue-400 hover:underline"> Login</Link>
      </span>
    </form>

    {/* Toast Notifications */}
    <ToastContainer />
  </div>
  );
}

export default Signup;
