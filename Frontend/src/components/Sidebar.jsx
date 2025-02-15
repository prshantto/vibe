import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { onlineUsersAtom } from "../recoil/atom";
import { selectedUserAtom } from "../recoil/atom";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);

  const [onlineUsers, setOnlineUsers] = useRecoilState(onlineUsersAtom);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getusers`)
      .then((res) => {
        const userData = res.data;
        setUsers(userData);
      });
  }, []);

  return (
    <div className="w-[25%] bg-gray-200">
      <h1 className="w-full text-center my-2 text-2xl font-semibold">Chats</h1>

      <div className="users flex flex-col gap-2">
        {users.map((chat) => {
          return (
            <button
              key={chat.uid}
              onClick={() => setSelectedUser(chat)}
              className={`
              w-full p-3 flex items-center gap-3
              hover:bg-gray-300 transition-colors
              ${
                selectedUser?._id === chat._id
                  ? "bg-gray-400 ring-1 ring-base-300"
                  : ""
              }
            `}
            >
              <img
                className="w-10 h-10 rounded-full"
                src={chat.photoURL || "/avatar.png"}
                alt="avatar"
              />
              <p className="flex flex-col text-left text-lg">
                {chat.firstname}
                {chat.lastname ? " " + chat.lastname : ""}

                <span className="text-xs text-gray-500">Offline</span>
              </p>

              {onlineUsers.includes(chat._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                        rounded-full ring-2 ring-zinc-900"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
