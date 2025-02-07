import { useState } from "react";
import NavBar from "../components/NavBar";
import { Copy } from "lucide-react";

const Profile = () => {
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const storedUserDataString = localStorage.getItem("user");
  const storedUserData = storedUserDataString
    ? JSON.parse(storedUserDataString)
    : null;

  const creationTime = storedUserData.creationTime.split(" ");

  const lastSignInTimeString = storedUserData.lastSignInTime;
  const lastSignInTimeArray = lastSignInTimeString.split(" ");
  lastSignInTimeArray.pop();
  lastSignInTimeArray.shift();
  const lastSignInTime = lastSignInTimeArray.join(" ");

  const copyToClipboard = async () => {
    setLoading(true);
    try {
      // Retrieve the text from local storage
      const text = storedUserData.uid;
      if (text) {
        // Use the Clipboard API to copy the text
        setTimeout(() => {
          navigator.clipboard.writeText(text);
          setLoading(false);
        }, 1000);
        // alert("Text copied to clipboard!");
      } else {
        alert("No text found in local storage!");
      }
    } catch (err) {
      console.error("Failed to copy text to clipboard:", err);
      alert("Failed to copy text to clipboard.");
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-screen h-[90vh] flex justify-center items-center flex-col md:flex-row gap-5 px-4 md:px-0">
        <div className="w-full md:w-[40%] h-auto md:h-[60%] bg-secondary/40 rounded-xl flex items-center flex-col p-4 md:p-0 shadow-2xl">
          <h1 className="text-2xl font-bold my-5">Profile</h1>
          <img
            src={storedUserData?.photoURL}
            alt="avatar"
            className="w-20 h-20 md:w-40 md:h-40 rounded-full"
          />
          <div className="info w-full px-2 md:px-5 text-lg md:text-xl">
            <h1 className="font-bold mb-1">Full Name</h1>
            <p className="border-2 border-neutral/40 rounded-lg py-1.5 px-2 mb-2 ">
              {storedUserData?.firstname + " " + storedUserData?.lastname}
            </p>
            <h1 className="font-bold mb-1">Email Address</h1>
            <p className="border-2 border-neutral/40 rounded-lg py-1.5 px-2 mb-2">
              {storedUserData?.email}
            </p>
          </div>
        </div>

        <div className="w-full md:w-[40%] h-auto md:h-[60%] bg-secondary/40 rounded-xl flex items-center flex-col p-4 md:p-0 shadow-2xl">
          <h1 className="text-2xl font-bold mt-5">Account Information</h1>
          <div className="w-full text-lg md:text-xl px-2 md:px-3 mt-3">
            <h2 className="font-bold mb-1">Last Signin</h2>
            <p className="border-2 border-neutral/40 rounded-lg py-1.5 px-2 mb-2">
              {lastSignInTime}
            </p>
            <h2 className="font-bold mb-1">Member Since</h2>
            <p className="border-2 border-neutral/40 rounded-lg py-1.5 px-2 mb-2">
              {creationTime[1] + " " + creationTime[2] + " " + creationTime[3]}
            </p>
            <h2 className="font-bold mb-1">Unique Chat ID (UID)</h2>
            <p className="border-2 border-neutral/40 rounded-lg py-1.5 px-2 mb-2 flex justify-between">
              <span onClick={copyToClipboard} className="cursor-pointer">
                {isLoading ? (
                  <span>Copied!</span>
                ) : (
                  <>
                    {" "}
                    <span className="hidden lg:block">
                      {storedUserData?.uid}
                    </span>
                    <span className="block lg:hidden">
                      {" "}
                      {`${storedUserData?.uid.slice(
                        0,
                        5
                      )}..........${storedUserData?.uid.slice(-5)}`}
                    </span>
                  </>
                )}
              </span>
              <Copy onClick={copyToClipboard} className="cursor-pointer" />
            </p>
            <h2 className="font-bold mb-1">Account Status</h2>
            <p className="border-2 border-neutral/40 rounded-lg py-1.5 px-2 mb-2 flex justify-between">
              {isOn ? <span>Online</span> : <span>Offline</span>}
              <label className="relative inline-block w-16 h-8">
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={() => setIsOn(!isOn)}
                  className="hidden"
                />
                <span
                  className={`block cursor-pointer pt-1 bg-gray-300 rounded-full w-full h-full transition-colors ${
                    isOn ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <span
                    className={`block w-6 h-6 bg-white rounded-full transition-transform ${
                      isOn ? "transform translate-x-10" : ""
                    }`}
                  ></span>
                </span>
              </label>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

// import { ref, onValue } from "firebase/database";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../firebase/firebaseConfig";

// useEffect(() => {
//   const fetchProfileData = async (user) => {
//     if (user) {
//       console.log(user);
//       const profileRef = ref(db, `users/${user.uid}`);
//       onValue(profileRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           setProfile(data);
//         }
//       });
//     }
//   };

//   // Check if the user is authenticated and fetch profile data
//   onAuthStateChanged(auth, (user) => {
//     fetchProfileData(user);
//     setIsOn(true);
//   });
// }, []);
