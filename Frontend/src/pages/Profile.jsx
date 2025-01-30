import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import NavBar from "../components/NavBar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const creationTime = auth.currentUser.metadata.creationTime.split(" ");
  const lastSignInTimeString =
    auth.currentUser.metadata.lastSignInTime.split(" ");
  lastSignInTimeString.pop();
  lastSignInTimeString.shift();
  const lastSignInTime = lastSignInTimeString.join(" ");

  useEffect(() => {
    const fetchProfileData = async (user) => {
      if (user) {
        console.log(user);
        const profileRef = ref(db, `users/${user.uid}`);
        onValue(profileRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setProfile(data);
          }
        });
      }
    };

    // Check if the user is authenticated and fetch profile data
    onAuthStateChanged(auth, (user) => {
      fetchProfileData(user);
    });
  }, []);

  return (
    <>
      <NavBar />

      <div className="w-screen h-[90vh] flex justify-center items-center flex-col gap-5 px-4 md:px-0">
        <div className="w-full md:w-[40%] h-auto md:h-[60%] bg-gray-300 rounded-xl flex items-center flex-col p-4 md:p-0">
          <h1 className="text-2xl font-bold my-3">Profile</h1>
          <img
            src={
              auth.currentUser.photoURL ||
              "https://api.dicebear.com/9.x/thumbs/svg?eyesColor=000000&mouth=variant5&shapeColor=1c799f&backgroundColor=0a5b83"
            }
            alt="avatar"
            className="w-20 h-20 md:w-40 md:h-40 rounded-full"
          />
          <div className="info w-full px-2 md:px-5 text-lg md:text-xl">
            <h1 className="font-bold mb-1">Full Name</h1>
            <p className="border-2 border-black rounded-lg py-1.5 px-1 mb-2 ">
              {profile?.firstname + " " + profile?.lastname ||
                auth.currentUser.displayName}
            </p>
            <h1 className="font-bold mb-1">Email Address</h1>
            <p className="border-2 border-black rounded-lg py-1.5 px-1 mb-2">
              {auth.currentUser.email || profile?.email}
            </p>
          </div>
        </div>

        <div className="w-full md:w-[40%] h-auto md:h-[30%] bg-gray-300 rounded-xl flex items-center flex-col p-4 md:p-0">
          <h1 className="text-2xl font-bold my-3">Account Information</h1>
          <div className="w-full text-lg md:text-xl px-2 md:px-3 font-semibold mt-3">
            <div className="flex justify-between">
              <h2 className="font-bold">Last Signin</h2>
              <p>{lastSignInTime}</p>
            </div>
            <div className="flex justify-between mt-3">
              <h2 className="font-bold">Member Since</h2>
              <p>
                {creationTime[1] +
                  " " +
                  creationTime[2] +
                  " " +
                  creationTime[3]}
              </p>
            </div>
            <div className="flex justify-between mt-3">
              <h2 className="font-bold">Account Status</h2>
              <p>Active</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
