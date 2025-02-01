import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Spinner from "../components/Spinner";
import Preloader from "../components/Preloader";
import "./Form.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/atom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useRecoilState(userAtom);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      // console.log(result.user);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/loginUser`,
        {
          email: result.user.email,
        }
      );

      setUser({
        firstname: result.user.displayName.split(" ")[0],
        lastname: result.user.displayName.split(" ")[1],
        email: result.user.email,
        photoURL:
          result.user.photoURL ||
          "https://api.dicebear.com/9.x/thumbs/svg?eyesColor=000000&mouth=variant5&shapeColor=1c799f&backgroundColor=0a5b83",
        uid: result.user.uid,
        creationTime: result.user.metadata.creationTime,
        lastSignInTime: result.user.metadata.lastSignInTime,
        emailVerified: result.user.emailVerified,
      });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error({ error: error });
      setErrors(error.response.data || "Error occurred while signing in");
    }
  };

  const handeleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential.user);

        setUser({
          firstname: userCredential.user.displayName.split(" ")[0],
          lastname: userCredential.user.displayName.split(" ")[1],
          email: userCredential.user.email,
          photoURL:
            userCredential.user.photoURL ||
            "https://api.dicebear.com/9.x/thumbs/svg?eyesColor=000000&mouth=variant5&shapeColor=1c799f&backgroundColor=0a5b83",
          uid: userCredential.user.uid,
          creationTime: userCredential.user.metadata.creationTime,
          lastSignInTime: userCredential.user.metadata.lastSignInTime,
          emailVerified: userCredential.user.emailVerified,
        });

        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setErrors("Invalid Email or Password");
      });

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <>
      <Preloader />

      <div className="container-body">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="container">
            <div className="form-header">
              <h2>
                <div className="text-4xl font-bold flex items-center justify-center">
                  <img
                    className="w-8 h-8 ml-2 inline-block"
                    src="./chat.png"
                    alt="logo"
                  />
                  <h1 className=" inline-block font-mono">
                    <span className="text-[#85def8]">Vi</span>
                    <span className="text-[#9de5b8]">be</span>
                  </h1>
                </div>
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
                    autoComplete="email"
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
                    autoComplete="current-password"
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
                    Continue with Google
                  </button>
                </div>

                {Object.keys(errors).length > 0 ? (
                  <div className="error-message">{errors.error || errors}</div>
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
