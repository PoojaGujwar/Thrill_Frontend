import { NavLink, Link } from "react-router-dom";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProjectForm from "../components/ProjectForm";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../pages/TaskDetails";
import Tasks from "./Tasks";
import { Search } from "lucide-react";


function Homepage() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const { data: projects,loading:projectLoading, error: projectError } = useFetch(
    "https://workasana-backend-kappa.vercel.app/projects"
  );
  const { data: fetchTasks,loading:taskLoading, error: taskError } = useFetch(
    "https://workasana-backend-kappa.vercel.app/tasks"
  );
  const { data: users, error: userError } = useFetch(
    "https://workasana-backend-kappa.vercel.app/users"
  );
  console.log(users)
  const [showProject, setShowValue] = useState(false)
  const [taskShowValue, setTaskShowValue] = useState(false)

  const [fetchT, setFetchTask] = useState([]);
  const [fetchProject, setFetchProject] = useState([])

  useEffect(() => {
    if (fetchTasks ) {
      setFetchTask(fetchTasks);
    }
    if(projects){
      setFetchProject(projects)
    }
  }, [fetchTasks,projects]);
    const handleStatusBtn = (e) => {
        const { value, checked } = e.target;
        let filterStatus;
        if(value !=="All"){
        if (checked) {
          filterStatus = fetchTasks?.filter((val) => val.status === value);
        } else {
          filterStatus = fetchTasks;
        }}else{
          filterStatus=fetchTasks
        }
        setFetchTask(filterStatus);
      };
      const handleAddProject =(newProject)=>{
        setFetchProject(prevValue => [...prevValue, newProject]);
      }
      const handleAddTasks =(newTask)=>{ 
        console.log(newTask,"New")
        setFetchTask(prevValue=>[...prevValue, newTask]);
      }
  

  return (
    <div className="mx-5 py-5">
      <div className="row">
        <div className="col-md-3">
          <Header />
        </div>
        <div className="col">
          <h3>
            Projects{" "}
            <NavLink className="btn btn-primary float-end" onClick={()=>setShowValue(true)}>
              + New Project
            </NavLink>
          </h3>
          <div className="row">
            {fetchProject?.map((project, index) => (
              
              <div className="col-md-4 col-sm-6">
                <div
                  className="card mb-3"
                >
                  <div className="card-body w-100 h-100"style={{ backgroundColor: "#e3e3eb"}}>
                    <h6 className="card-text">{project.name}</h6>
                    <span className="card-text fw-light fs-small">
                      description: {project.description}
                    </span>
                  </div>
                </div>
              </div>
              
            ))}
          </div>
          <hr />
 <div>
      <h3>
        Tasks
        <NavLink
          className="btn btn-primary float-end"
          onClick={() => setTaskShowValue(true)}
        >
          + New Task
        </NavLink>
      </h3>
      
      <label>Filter</label>
      <div>
        <input
          type="radio"
          name="status"
          value={"All"}
          onChange={handleStatusBtn}
        />{" "}
        All
        <br />
        <input
          type="radio"
          name="status"
          value={"In Progress"}
          onChange={handleStatusBtn}
        />{" "}
        In Prpgress
        <br />
        <input
          type="radio"
          name="status"
          value={"Completed"}
          onChange={handleStatusBtn}
        />{" "}
        Completed
      </div>
      { <div className="row py-3">
        {fetchT?.map((task, index) => (
          <div className="col-md-4 col-sm-6">
            <NavLink
              to={`/tasks/${task._id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card mb-3"
                style={{ backgroundColor: "#e3e3eb", border: "none" }}
              >
                <div className="card-body">
                  <span
                    className="px-3 py-1"
                    style={{
                      backgroundColor:
                        task.status === "Completed"
                          ? "#90EE90"
                          : task.status === "In Progress"
                          ? "#FFFFE0"
                          : "#E6BE8A",
                      color:
                        task.status === "Completed"
                          ? "dark-green"
                          : task.status === "In Progress"
                          ? "#DAA520"
                          : "#8B4513",
                    }}
                  >
                    {task.status}
                  </span>
                  <br />
                  <br />
                  <h6>{task.name}</h6>
                  <span>
                    {" "}
                    Due on [{new Date(task.dueDate).getDate()}th {months[index]}{" "}
                    {new Date(task.dueDate).getFullYear()}]
                  </span>
                  <p>
                    {task.owners
                      ?.map((val) => {
                        const selecetd = users?.find(
                          (userId) => userId._id === val
                        );
                        return selecetd ? selecetd.name : null;
                      })
                      .join(", ")}
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div> }
      
    </div> 
          {showProject && <ProjectForm onClose={()=>setShowValue(false)} onAddProject={handleAddProject}/>}
          {taskShowValue && <TaskForm onWork={()=>setTaskShowValue(false)} onAddTask={handleAddTasks}/>}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
