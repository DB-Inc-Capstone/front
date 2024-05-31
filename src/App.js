import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import ResetPW from "./pages/ResetPW";
import Work from "./pages/Work";
import Worklist from "./pages/Worklist";
import Issue from "./pages/Issue";
import Dashboard from "./pages/Dashboard"
import { WorkerProvider } from './pages/WorkerContext';

function App() {
  return (
    <WorkerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/worker/login" />} />
          <Route path="/worker/login" element={<Login />} />
          <Route path="/worker/signup" element={<Singup />} />
          <Route path="/worker/resetpw" element={<ResetPW />} />
            
          <Route path="/work" element={<Work />} />
          <Route path="/work/worklist" element={<Worklist />} />
          <Route path="/work/issue" element={<Issue />} />
          <Route path="/work/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </WorkerProvider>
  );
}

export default App;