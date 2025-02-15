import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <ChatHeader />
      <div className="bg-red-300 w-full h-[70vh]">Messagess...</div>
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
