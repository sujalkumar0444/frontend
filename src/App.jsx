import "./App.css";
import { Provider } from 'react-redux';
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Leaderboard from "./pages/Leaderboard";
import Jobs from "./pages/Jobs";
import Contests from "./pages/Contests";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Course from "./pages/Course";


function App() {
  return (<>
  <Provider store={store}>
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/leaderboard" element={<Leaderboard />} />
    <Route path="/jobs" element={<Jobs />} />
    <Route path="/contests" element={<Contests />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/course/:courseid" element={<Course />} />
    </Routes>
  </BrowserRouter>
  </Provider>
   
  </>);
}

export default App;
