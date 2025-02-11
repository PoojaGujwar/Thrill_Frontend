import useFetch from "../useFetch";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import Header from "../components/Header";

export default function Tasks() {
   const [fetchT, setFetchTask] = useState([]);
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
  const [taskShowValue, setTaskShowValue] = useState(false)

     const { data: fetchTasks,loading, error: taskError } = useFetch(
         "https://workasana-backend-kappa.vercel.app/tasks"
       );
       const { data: users, error: userError } = useFetch(
        "https://workasana-backend-kappa.vercel.app/users"
      );

 useEffect(() => {
     if (fetchTasks ) {
      setFetchTask(fetchTasks);
    }},[fetchTasks])
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
      const handleAddTasks =(newTask)=>{ 
        console.log(newTask,"New")
        setFetchTask(prevValue=>[...prevValue, newTask]);
      }
  return (
   <div className="mx-5">
    <div className="">
      <h3>
        Tasks
        <NavLink
          className="btn btn-primary float-end  "
          onClick={() => setTaskShowValue(true)}
        >
          + New Task
        </NavLink>
      </h3>

      
    
     </div>
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
      <div className="row py-3">
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
      </div>
      {taskShowValue && <TaskForm onWork={()=>setTaskShowValue(false)} onAddTask={handleAddTasks}/>}
    </div>
  
  );
}
