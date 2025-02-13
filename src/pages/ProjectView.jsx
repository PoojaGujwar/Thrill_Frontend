import { useLocation, useParams, NavLink } from "react-router-dom"
import useFetch from "../useFetch"
import { useEffect, useState } from "react"
import TaskForm from "../components/TaskForm"
import FilterByTag from "../filters/FilterByTag"

export default function ProjectView() {
    const {projectId} = useParams()
    const location = useLocation()
    const [taskShowValue, setTaskShowValue] = useState(false)
    
    const projectName = location.state
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const {data:tasks,loading,error:tasksError}=useFetch("https://workasana-backend-kappa.vercel.app/tasks")
    const {data:users,error:usersError}=useFetch("https://workasana-backend-kappa.vercel.app/users")
    const [fetchTask, setFetchTask] = useState([])
    const [selectedOwner, setSelectedOwner] = useState([])

    

    useEffect(()=>{
        if(tasks){
            const filterdTaskByProject = tasks?.filter((task)=>task.project === projectId)
            setFetchTask(filterdTaskByProject)
            setSelectedOwner(filterdTaskByProject)
            }
    },[tasks])
    

    const handleAddTasks =(newTask)=>{ 
        console.log(newTask,"New")
        setFetchTask(prevValue=>[...prevValue, newTask]);
      }
  return (
    <div className="mx-5 w-100">
        <h1 className="pb-5">Project: {projectName}</h1>
        {loading && <p>Loading...</p>}
    <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
            <tbody>
            {selectedOwner?.map((task,index)=>(
                 <tr>
                   <td>{task.name}</td>
                   <td>{task.owners?.map((ownersId)=>{
                    const selectedId = users?.find((val)=>val._id === ownersId)
                    return selectedId?selectedId.name:null
                   }).join(", ")}</td>
                   <td>{new Date(task.updatedAt).getDate()} {months[new Date(task.updatedAt).getMonth()+1]},{new Date(task.updatedAt).getFullYear()}</td>
                   <td>{task.status}</td>
                   </tr>
            ))}
            </tbody>
            </table>
            <div><NavLink
          className="btn btn-primary float-end"
          onClick={() => setTaskShowValue(true)}
        >
          + New Task
        </NavLink></div>
        <FilterByTag allData={fetchTask} setSelectedOwner={setSelectedOwner}/>
        
        
        {taskShowValue && <TaskForm onWork={()=>setTaskShowValue(false)} onAddTask={handleAddTasks}/>}
    </div>
  )
}
