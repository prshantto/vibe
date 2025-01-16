import React, { useEffect, useState } from "react";

const Preloader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a network request or other async tasks
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    !isLoaded && (
      <div className="flex justify-center items-center h-screen w-screen bg-white fixed top-0 left-0 z-50">
        <img
          src="./chat.png"
          alt="Loading..."
          className="heartbeat w-24 h-24"
        />
      </div>
    )
  );
};

export default Preloader;
