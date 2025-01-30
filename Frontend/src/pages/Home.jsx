/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
