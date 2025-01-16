import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      {" "}
      <div className="relative flex justify-center items-center">
        {" "}
        <div
          className="absolute rounded-full w-16 h-16 border-t-2 border-b-2 animate-spin"
          style={{
            borderColor: "transparent",
            borderTopColor: "#3490dc",
            borderBottomColor: "#3490dc",
          }}
        ></div>{" "}
      </div>
    </div>
  );
};

export default Spinner;
