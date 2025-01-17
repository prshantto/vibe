import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async (user) => {
      if (user) {
        console.log(user);
        const profileRef = ref(db, `users/${user.uid}`);
        onValue(profileRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
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
  }, [db, auth]);

  return (
    <div>
      <p>{profile?.firstname + " " + profile?.lastname}</p>
      <p>{profile?.username}</p>
      <p>{profile?.email}</p>
      <p>{profile?.username}</p>
      <img
        src={profile?.photoURL || "https://api.dicebear.com/9.x/pixel-art/svg"}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
    </div>
  );
};

export default Profile;
