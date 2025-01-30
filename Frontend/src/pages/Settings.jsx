import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Settings = () => {
  const handleEmailVerification = async () => {
    if (!auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser);
    } else {
      alert("Email already verified");
    }
  };
  return (
    <div>
      <button onClick={handleEmailVerification}>Verify Email</button>
    </div>
  );
};

export default Settings;
