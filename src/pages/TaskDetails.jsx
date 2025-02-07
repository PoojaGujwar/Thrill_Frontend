import { NavLink, useParams } from "react-router-dom"
import useFetch from "../useFetch";

export default function TaskDetails(){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const {taskId} = useParams()
    const { data,loading, error } = useFetch(
        "https://workasana-backend-kappa.vercel.app/tasks"
      );
      const { data: projects, error: projectError } = useFetch(
        "https://workasana-backend-kappa.vercel.app/projects"
      );
      const { data: users, error: userError } = useFetch(
        "https://workasana-backend-kappa.vercel.app/users"
      );
      const foundedTaks = data?.find(task=>task._id===taskId)
      const findByProject = projects?.find((project)=>project._id === foundedTaks?.project)
      const findByOwners = users?.filter((own)=> foundedTaks?.owners.find((owner)=> owner === own._id))
      const dueDate = new Date(foundedTaks?.dueDate).getDate()
      const dueYear = new Date(foundedTaks?.dueDate).getFullYear()
      const dueMonth = new Date(foundedTaks?.dueDate).getMonth()
     const currentDate = new Date().getDate()-dueDate
     const currentYear = new Date().getFullYear()-dueYear
     const currentMonth = new Date().getMonth()-dueMonth
     console.log(currentYear)
    return (
        <div className="row mx-5 py-5">
            <div className="col-md-3">
<header>
<h3>ThrillTeamsUp</h3>
<NavLink to="/home">Back to home</NavLink>
</header>
       </div>
        <div className="col">
            <h1 className="display-3 pb-3">Tasks Details</h1>
            {loading && <p>Loading...</p>}
            <h4>{foundedTaks?.name}</h4>
            <p>Project: {findByProject?.name}</p>
            <p>Owners: 
            <ul>
                {findByOwners?.map((user)=>(
                    <li>{user.name}</li>
                ))}
            </ul>
</p>
            <p>Tags: {foundedTaks?.tags.map((tag)=>tag).join(", ")}</p>
            <p>Due Date: {dueDate}{months[dueMonth]}, {dueYear}</p>
            <p>Status: {foundedTaks?.status}</p>
            <p>Time Remaining: {currentDate} days</p>
        </div>
        </div>
    )
}