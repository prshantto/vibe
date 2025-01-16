import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handeleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/login`, user)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setErrors({});
          navigate("/home");
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.errors?.[0]?.msg ||
          err.response?.data?.message ||
          "An error occurred during login";
        console.log(err);
        setErrors({ error: errorMessage });
      });
    setUsername("");
    setPassword("");
  };
  return (
    <div className="container-body">
      <div className="container">
        <div className="form-header">
          <h2>
            Login to <span className="text-[#85def8]">Vi</span>
            <span className="text-[#9de5b8]">be</span>
            <img
              className="w-6 h-6 ml-2 inline-block"
              src="./chat.png"
              alt=""
            />
            <p className="welcome-message text-sm">
              Welcome! Please fill in the details to get started.
            </p>
          </h2>
          <form onSubmit={handeleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="username"
                id="username"
                name="username"
                placeholder="Enter your @username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                required
              />
            </div>

            <button type="submit" className="btn">
              Login
            </button>

            <div className="login-divider text-gray-500 text-center my-1 text-xl">
              or
            </div>

            <div className="google-login flex justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="google-btn w-full flex justify-center items-center gap-3 text-[#3c4043] text-xl font-medium 
                py-2 px-4 rounded-full border border-[#dadce0] bg-white hover:bg-gray-50 
                hover:shadow-md transition-all duration-200 shadow-md"
              >
                <img src="./google.png" alt="Google Logo" className="h-8 w-8" />
                Sign in with Google
              </button>
            </div>

            {Object.keys(errors).length > 0 ? (
              <div className="error-message">{errors.error}</div>
            ) : null}
          </form>
        </div>

        <div className="form-footer">
          <p>
            Don't have an account?{" "}
            <span
              className="link text-blue-600 font-bold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
