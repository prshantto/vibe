import { useState, useEffect } from "react";
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
    <div>
      <p>
        name:
        {auth.currentUser.displayName ||
          profile?.firstname + " " + profile?.lastname}
      </p>
      <p>email: {auth.currentUser.email || profile?.email}</p>
      <img
        src={
          auth.currentUser.photoURL ||
          "https://api.dicebear.com/9.x/thumbs/svg?eyesColor=000000&mouth=variant5&shapeColor=1c799f&backgroundColor=0a5b83"
        }
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
    </div>
  );
};

export default Profile;
