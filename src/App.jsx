import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Leaderboard from "./pages/Leaderboard";
import Jobs from "./pages/Jobs";
import Contests from "./pages/Contests";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";

function App() {
  return (<>
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/leaderboard" element={<Leaderboard />} />
    <Route path="/jobs" element={<Jobs />} />
    <Route path="/contests" element={<Contests />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/courses" element={<Courses />} />
    </Routes>
  </BrowserRouter>
   
  </>);
}

export default App;
