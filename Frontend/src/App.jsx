import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProtectRoute from "./components/ProtectRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile"
        element={
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
        }
      />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
