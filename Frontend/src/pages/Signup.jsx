import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { ref, set } from "firebase/database";
import Spinner from "../components/Spinner";
import "./Form.css";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handeleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);

      await updateProfile(userCredential.user, {
        displayName: `${firstname} ${lastname}`,
      });

      await set(ref(db, `users/${userCredential.user.uid}`), {
        firstname: firstname,
        lastname: lastname,
        email: email,
      });

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      console.log(error);
      setErrors({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-body">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="form-header">
            <h2>
              Register to <span className="text-[#85def8]">Vi</span>
              <span className="text-[#9de5b8]">be</span>
              <img
                className="w-6 h-6 ml-2 inline-block"
                src="./chat.png"
                alt=""
              />
              <p className="welcome-message text-sm">
                Welcome! Create an account to start Vibing with friends.
              </p>
            </h2>

            <form onSubmit={handeleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <div className="name-inputs">
                  <input
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    required
                  />
                  <input
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

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
                  placeholder="Create a password"
                  required
                />
              </div>

              <button type="submit" className="btn">
                Sign Up
              </button>

              {Object.keys(errors).length > 0 ? (
                <div className="error-message">{errors.error}</div>
              ) : null}
            </form>
          </div>
          <div className="form-footer">
            <p>
              Already have an account?{" "}
              <span className="link" onClick={() => navigate("/login")}>
                Login here
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
