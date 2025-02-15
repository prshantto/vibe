/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { selectedUserAtom } from "../recoil/atom";

const Home = () => {
  const selectedUser = useRecoilValue(selectedUserAtom);

  return (
    <>
      <NavBar />

      <div className="min-h-screen flex">
        <Sidebar />

        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </>
  );
};

export default Home;
