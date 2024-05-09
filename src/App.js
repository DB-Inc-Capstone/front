import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Signup";

import Work from "./pages/Work";
import Worklist from "./pages/Worklist";
import Issue from "./pages/Issue";

import FindPW from "./pages/FindPW";
import ModifyPW from "./pages/ModifyPW";

import MenuBar from "./components/MenuBar";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worker/login" element={<Login />} />
        <Route path="/worker/signup" element={<Singup />} />

        <Route path="/worker/findpw" element={<FindPW />} />
        <Route path="/worker/modifypw" element={<ModifyPW />} />

        <Route path="/work" element={<Work />} />
        <Route path="/work/worklist" element={<Worklist />} />
        <Route path="/work/issue" element={<Issue />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;