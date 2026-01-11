import { Route, Routes } from "react-router-dom";
import AuthPage from "./components/pages/AuthPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/:pathname" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
