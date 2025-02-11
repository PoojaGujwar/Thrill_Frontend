import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from "./pages/Homepage";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import TaskDetails from "./pages/TaskDetails";
import Report from "./pages/Report";
import Tasks from "./pages/Tasks";
import ProjectView from "./pages/ProjectView";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const shouldShowHeader = location.pathname !== "/" && location.pathname !== "/signup";

  return (
    <div className="d-flex mx-4 py-4">
      {shouldShowHeader && <Header />} 
      <Routes className="mx-5">
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/project/:projectId" element={<ProjectView />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="teams/:teamId" element={<TeamDetails />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:taskId" element={<TaskDetails />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;
