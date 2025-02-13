import { NavLink, useParams } from "react-router-dom"
import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import {ArrowBigLeftDash} from "lucide-react"

export default function TaskDetails(){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const {taskId} = useParams()
    const [foundedTask, setFoundedTask] = useState(null)
    const { data,loading, error } = useFetch(
        "https://workasana-backend-kappa.vercel.app/tasks"
      );
      const { data: projects, error: projectError } = useFetch(
        "https://workasana-backend-kappa.vercel.app/projects"
      );
      const { data: users, error: userError } = useFetch(
        "https://workasana-backend-kappa.vercel.app/users"
      );

      useEffect(()=>{
        if(data){
            const task = data?.find(val=>val._id===taskId)
            setFoundedTask(task)
        }
      },[data, taskId])
      const findByProject = projects?.find((project)=>project._id === foundedTask?.project)
      const findByOwners = users?.filter((own)=> foundedTask?.owners.find((owner)=> owner === own._id))
      const dueDate = new Date(foundedTask?.dueDate).getDate()
      const dueYear = new Date(foundedTask?.dueDate).getFullYear()
      const dueMonth = new Date(foundedTask?.dueDate).getMonth()
     const currentDate = new Date().getDate()-dueDate
     const currentYear = new Date().getFullYear()-dueYear
     const currentMonth = new Date().getMonth()-dueMonth
     console.log(currentYear)
     const handleSubmit =async(e,taskId)=>{
        e.preventDefault()
        try{
            const response =await  fetch(`https://workasana-backend-kappa.vercel.app/tasks/${taskId}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({status:'Completed'})
            })
            const data = await response.json()
            setFoundedTask(data)

        }catch(error){
            throw new Error("Failed to Fetch")
        }
     }
    return (
        <div className="row mx-5 py-4">
       <div className="mb-3 d-flex justify-content-start align-items-center">
            <ArrowBigLeftDash className="text-primary "/>
            <NavLink to="/tasks" className="fs-5 fw-bold mx-2"> Back to Tasks</NavLink>
            </div>

        <h1 className="display-4 fw-bold text-center text-primary">Tasks Details</h1>
            {loading && <p>Loading...</p>}
            <div className="col-md-8 py-3">
                <div className="card">
            <form onSubmit={(e)=>handleSubmit(e,foundedTask?._id)}>
                <div className="card-header">
            <h3>{foundedTask?.name}</h3>
            </div>
            <div className="card-body fw-bold">
            <p className="">Project: {findByProject?.name}</p>
            <p>Owners: 
            <ul>
                {findByOwners?.map((user)=>(
                    <li>{user.name}</li>
                ))}
            </ul>
</p>
            <p>Tags: {foundedTask?.tags.map((tag)=>tag).join(", ")}</p>
            <p>Due Date: {dueDate}{months[dueMonth]}, {dueYear}</p>
            <p>Status: {foundedTask?.status}</p>
            <p>Time Remaining: {currentDate} days</p>
            
            <button className="btn btn-primary" type="submit">Mark as Complete</button>
            </div>
            </form>
            </div>
            </div>
        </div>
    )
}