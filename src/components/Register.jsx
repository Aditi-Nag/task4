import React, { useState } from "react";
import axios from "axios";

function Register() {
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });

      
      alert(response.data?.message || "Registration successful! Now please log in.");
      
      
      window.location.href = "/login";
    } catch (error) {
      
      alert(error.response?.data?.message || "Registration failed! Try again.");
    }
  };

  return (
    <div className="w-full h-screen flex">
     
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h2>This is a registration form:</h2>

        <div className="text-center mb-4">
          <h4>Join us today</h4>
          <h2>Create an Account</h2>
        </div>

        <form className="max-w-sm" onSubmit={handleSubmit}>
         
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={handleNameChange}
              className="px-4 py-1.5 border border-gray-500 m-2 rounded font-black"
              required
            />
          </div>

          
          <div>
            <input
              type="email"
              placeholder="e-mail"
              value={email}
              onChange={handleEmailChange}
              className="px-4 py-1.5 border border-gray-500 m-2 rounded font-black"
              required
            />
          </div>

          
          <div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              className="px-4 py-1.5 m-3 border border-gray-500 rounded font-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-[120px] bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-2.5 px-3 rounded transition duration-200 m-3"
          >
            Sign Up
          </button>
        </form>

       
        <div className="w-full text-center text-xs m-5">
          <span>Already have an account? <a href="/login" className="text-blue-600">Sign in</a></span>
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

export default Register;