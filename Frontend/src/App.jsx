import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectRoute from "./components/ProtectRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
