import React from "react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-[75%]">
      <img
        className="w-16 h-16 md:w-16 md:h-16 ml-2 animate-bounce"
        src="./chat.png"
        alt="logo"
      />
      <h1 className="text-4xl font-bold mb-1">Welcome to Vibe!</h1>
      <p className="text-gray-500 mb-4">
        Select a chat from sidebar to start vibing
      </p>
    </div>
  );
};

export default NoChatSelected;
