import { useState } from "react"
import Header from "../components/Header"
import ProjectForm from "../components/ProjectForm"
import useFetch from "../useFetch"
import { NavLink, useLocation, useParams, useSearchParams } from "react-router-dom"
const Projects =()=>{
    const {data:tasks,error:tasksError}=useFetch("https://workasana-backend-kappa.vercel.app/tasks")
    const {data:users,error:usersError}=useFetch("https://workasana-backend-kappa.vercel.app/users")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [showProject, setShowValue] = useState(false)
    const  project_id= useLocation()
    console.log(project_id)
    return(
        <>
           
        <div className="row my-5 mx-5">
            <div className="col-md-3">
                <Header/>
            </div>
            <div className="col flex flex-col">
            <h3 className="mb-3">Project <NavLink className="btn btn-primary float-end" onClick={()=>setShowValue(true)}>+ New Project</NavLink></h3>
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
            {tasks?.map((task,index)=>(
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
            {showProject && <ProjectForm onClose={()=>setShowValue(false)}/>}
            </div>
          
        </div>
        </>
    )
}
export default Projects