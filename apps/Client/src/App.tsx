import { Route, Routes } from "react-router-dom";
import SIGN_UP from "./components/pages/SignUp";
import SIGN_IN from "./components/pages/SignIn";
function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/sign-up" element={<SIGN_UP />} />
        <Route path="/auth/sign-in" element={<SIGN_IN/>} />
      </Routes>
    </>
  );
}

export default App;
