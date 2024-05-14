import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import ResetPW from "./pages/ResetPW";
import Work from "./pages/Work";
import Worklist from "./pages/Worklist";
import Issue from "./pages/Issue";
import Timeline from "./pages/Timeline";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worker/login" element={<Login />} />
        <Route path="/worker/signup" element={<Singup />} />
        <Route path="/worker/resetpw" element={<ResetPW />} />
          
        <Route path="/work" element={<Work />} />
        <Route path="/work/worklist" element={<Worklist />} />
        <Route path="/work/issue" element={<Issue />} />
        <Route path="/work/timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;