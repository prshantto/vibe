import useEffect from "react";
import axios from "axios";

useEffect(() => {
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`);
}, []);

const Sidebar = () => {
  return <div className="w-[25%] bg-red-500">Sidebar</div>;
};

export default Sidebar;
