import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from "./pages/Homepage";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import TaskDetails from "./pages/TaskDetails";
import Report from "./pages/Report";
import Tasks from "./pages/Tasks";

export default function App(){
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Homepage/>}/>
          <Route path="/project" element={<Projects/>}/>
          <Route path="/teams" element={<Teams/>}/>
          <Route path="teams/:teamId" element={<TeamDetails/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/tasks/:taskId" element={<TaskDetails/>}/>
          <Route path="/report" element={<Report/>}/>
        </Routes>
      </Router>
    </div>
  )
}
