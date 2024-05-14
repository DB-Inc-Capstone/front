import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import ResetPW from "./pages/ResetPW";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worker/login" element={<Login />} />
        <Route path="/worker/signup" element={<Singup />} />
        <Route path="/worker/resetpw" element={<ResetPW />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;