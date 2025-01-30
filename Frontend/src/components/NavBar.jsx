import { Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-sky-100">
      <div className="logo text-4xl font-bold flex items-center gap-2">
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

      <div className="flex gap-2">
        <button onClick={() => navigate("/settings")} className="flex">
          <Settings />
          Settings
        </button>
        <button onClick={() => navigate("/profile")} className="flex">
          <User />
          Profile
        </button>
        <button onClick={handleLogout} className="flex">
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
