/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProtectRoute from "./components/ProtectRoute";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./recoil/atom";

const App = () => {
  const theme = useRecoilValue(themeAtom);
  return (
    <div data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <Home />

            // <ProtectRoute>
            //   <Home />
            // </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <Profile />

            // <ProtectRoute>
            //   <Profile />
            // </ProtectRoute>
          }
        />
        <Route
          path="settings"
          element={
            <Settings />

            // <ProtectRoute>
            //   <Settings />
            // </ProtectRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
