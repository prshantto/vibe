import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase/firebaseConfig";

const Home = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async (user) => {
      if (user) {
        const profileRef = ref(db, `users/${user.uid}`);
        onValue(profileRef, (snapshot) => {
          const data = snapshot.val();
          setProfile(data);
        });
      }
    };
    // Check if the user is authenticated and fetch profile data
    onAuthStateChanged(auth, (user) => {
      fetchProfileData(user);
    });
  }, [onAuthStateChanged]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEmailVerification = async () => {
    if (!auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser);
    } else {
      alert("Email already verified");
    }
  };
  const handleProfile = () => {
    console.log(profile);
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleEmailVerification}>Verify Email</button>
      <p>{profile?.firstname + " " + profile?.lastname}</p>
      <p>{profile?.username}</p>
      <p>{profile?.email}</p>
    </div>
  );
};

export default Home;
