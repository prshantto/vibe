import { useEffect } from "react";
import axios from "axios";

const Sidebar = () => {
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getusers`)
      .then((res) => {
        const users = res.data;
        console.log(users);
      });
  }, []);

  return (
    <div className="w-[25%] bg-gray-200">
      <h1>Chats</h1>
      <div></div>
    </div>
  );
};

export default Sidebar;
