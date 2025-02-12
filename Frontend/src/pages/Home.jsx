/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />

      <div className="min-h-screen flex">
        <Sidebar />
        <NoChatSelected />
      </div>
    </>
  );
};

export default Home;
