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
    <div className="flex justify-between items-center px-4 py-2 bg-primary">
      <div
        onClick={() => navigate("/")}
        className="logo text-3xl md:text-4xl font-bold flex items-center gap-2 cursor-pointer"
      >
        <img
          className="w-6 h-6 md:w-8 md:h-8 ml-2 inline-block"
          src="./chat.png"
          alt="logo"
        />
        <h1 className="inline-block font-mono">
          <span className="text-[#85def8]">Vi</span>
          <span className="text-[#9de5b8]">be</span>
        </h1>
      </div>

      <div className="flex item-center justify-center gap-2 md:gap-5 mt-3 md:mt-0 font-semibold">
        <button onClick={() => navigate("/settings")} className="flex gap-1">
          <Settings />
          <span className="hidden md:inline">Settings</span>
        </button>
        <button onClick={() => navigate("/profile")} className="flex gap-1">
          <User />
          <span className="hidden md:inline">Profile</span>
        </button>
        <button onClick={handleLogout} className="flex gap-1">
          <LogOut />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
