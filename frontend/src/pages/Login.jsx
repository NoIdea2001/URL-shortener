import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { handleError, handleSuccess } from "./util";

function Login({setToken,setAuthenticated}) {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email or Password missing");
    }
    try {
      loginInfo.email = loginInfo.email.toLowerCase();
      const url = "http://localhost:9090/auth/login/";
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const {success,jwtToken,message,name,error} = result;
      if (!success) {
        return handleError(message);
      }
      if (error) {
        return handleError(error.details[0].message)
      }
      localStorage.setItem('token',jwtToken)
      localStorage.setItem('loggedInUser',name)
      setAuthenticated(true)
      setToken(jwtToken)

      handleSuccess(result.message);
      setTimeout(()=>{
        Navigate('/home');
      },1000)
    } catch (error) {
      console.log(error);

      return handleError("server error");
    }
  };

  return (
    <div className="container mx-auto max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg">
  <h1 className="text-2xl font-bold mb-4">Login</h1>
  <form onSubmit={handlelogin} className="space-y-4">
    <div>
      <label htmlFor="email" className="block text-sm font-medium mb-1">
        Email
      </label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Enter your email"
        value={loginInfo.email}
        className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label htmlFor="password" className="block text-sm font-medium mb-1">
        Password
      </label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Enter your Password"
        value={loginInfo.password}
        className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
    >
      Login
    </button>
    
    <span className="block text-sm text-gray-400 mt-4">
      Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
    </span>
  </form>
  <ToastContainer />
</div>

  );
}

export default Login;
