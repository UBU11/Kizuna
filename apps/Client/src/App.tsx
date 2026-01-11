import { Route, Routes } from "react-router-dom";
import AuthPage from "./components/pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/sign-up" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
