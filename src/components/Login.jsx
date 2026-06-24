import React, {useState}from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const handleEmailChange =(e) =>{
     setEmail(e.target.value)
  };
  const handlePasswordChange =(e) =>{
     setPassword(e.target.value)
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:5000/api/login", { 
        email, 
        password 
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard"; 
    } catch (error) {
      alert(error.response?.data?.message || "Login failed! Please try again.");
    }
  };
  
  return ( 
    <div className="w-full h-screen flex">
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white">
      <h2>This is a login form:</h2>

      <div>
         <h4>start your journey</h4>
         <h2>Sign in to the App</h2>
      </div>
      <form className="max-w-sm" onSubmit={handleSubmit}>
         
        <div>
          
          <input type="email" placeholder="e-mail" value={email} onChange={handleEmailChange} className="px-4 py-1.5 border border-gray-500 m-2 rounded font-black" required />
        </div>

        <div>
          <input type="Password" placeholder="password" value={password} onChange={handlePasswordChange} className="px-4 py-1.5 m-3 border border-gray-500  rounded font-black" required />
        </div>
      <div>
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <button type="submit" className=" w-[100px] bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2.5 px-3 rounded transition duration-200 m-3">Sign In</button>
        </form>
        <div className="w-full flex justify-between text-xs m-7">
        <span>Don't have an account? <a href="/register" className="text-blue-600">Sign up</a></span>
        <br />
        <a href="#forgot" className="text-blue-600">Forgot password?</a>
      </div>
      </div>

      <div className="hidden md:block md:w-1/2 h-full">
        <img 
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop" 
          alt="Workspace Coding Setup" 
          className="w-90 h-100 p-6 m-4 object-cover"
        />
      </div>
    </div>
  );
}

export default Login;