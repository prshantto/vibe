import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import "./Form.css";
import Loader from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handeleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrors({ error: error.message });
      });

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <Loader />

      <div className="container-body">
        {isLoading ? (
          <Loader />
        ) : (
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
                  Welcome Back! Login to start Vibing with friends.
                </p>
              </h2>
              <form onSubmit={handeleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
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
                    className="google-btn w-full flex justify-center items-center gap-3 text-[#3c4043] text-lg lg:text-xl font-medium 
                py-2 px-4 rounded-full border border-[#dadce0] bg-white hover:bg-gray-50 
                hover:shadow-md transition-all duration-200 shadow-md"
                  >
                    <img
                      src="./google.png"
                      alt="Google Logo"
                      className="h-8 w-8"
                    />
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
                Don&apos;t have an account?{" "}
                <span
                  className="link text-blue-600 font-bold cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up here
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
