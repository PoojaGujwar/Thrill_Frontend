import { useRef, useState } from "react"
import useFetch from "../useFetch"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { X } from 'lucide-react';

export default function TaskForm({onWork,onAddTask}){
    const navigate = useNavigate()
    const {data:projects,error:projectError} = useFetch("https://workasana-backend-kappa.vercel.app/projects")
    const {data:users,error:onwerError} = useFetch("https://workasana-backend-kappa.vercel.app/users")
    const {data:tags,error:tagError} = useFetch("https://workasana-backend-kappa.vercel.app/tags")
    const {data:teams,error:teamsError} = useFetch("https://workasana-backend-kappa.vercel.app/teams")
const [status,setStatus] = useState("")
const [tasks,setTasks] = useState("")
const [projectName, setProjectName] = useState('')
const [userName, setUserName] = useState([])
const [tagName,setTagName] = useState([])
const [teamName, setTeamName] = useState('')
const [timeToComplete, setTimeToComplete] = useState()
const [dueDate, setDueDate] = useState()
const [formData, setFormData] = useState(false)
const [message,setMessage] = useState('')
const modelRef = useRef()
const closeModel =(e)=>{
    if(modelRef.current === e.target){
        onWork()
    }
}
const initialData ={
    name:tasks,
    project:projectName,
    owners:userName,
    status:status,
    tags:tagName,
    team:teamName,
    timeToComplete:parseInt(timeToComplete),
    dueDate

}

const handleSubmitBtn =async(e)=>{
e.preventDefault()
if(timeToComplete && teamName && tagName && userName && projectName && tasks && status){
    setFormData(true)
    console.log(initialData,"Due date",dueDate)
    try{
    const resposne = await fetch("https://workasana-backend-kappa.vercel.app/tasks",{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(initialData)
    })
    const data = await resposne.json()
    if(data){
        setMessage("Task added successfully")
        setStatus('')
        setTagName('')
        setProjectName('')
        setTasks('')
        setTeamName('')
        setTimeToComplete('')
        setDueDate()
        onAddTask(data)
        onWork()
        
    }}catch(error){
        throw new Error("Failed to fetched")
    }
}else{
    console.log("All filed are required")
}
}
const handleCheckbox =(e)=>{
    const {value, checked} = e.target
    if(checked){
        setTagName((prevValue)=>[...prevValue,value])
    }else{
        setTagName((prevValue)=>prevValue.filter((val)=> val != value))
    }
}
const handleOwner=(e)=>{
    const {value, checked} = e.target
    if(checked){
        setUserName((prevValue)=>[...prevValue,value])
    }else{
        setUserName((prevValue)=>prevValue.filter((val)=>val != value))
    }
}

    
    return (
        <div ref={modelRef} onClick ={closeModel} className="inset-0 fixed  bg-black bg-opacity-50 flex justify-center items-center" style={{ minHeight: "100vh", zIndex: "1050",minWidth:"100vh" }}>
           <div className='bg-light p-4 rounded my-5 mx-5 ' style={{width:"35%"}}>
           <h3>Task Form <button onClick={onWork} className="float-end"><X/></button></h3>
            <form onSubmit={handleSubmitBtn} className="">
                {message && <p className="alert alert-success">{message}</p>}
                <div className="row">
                <div className="col">

                    <label>Task name: </label>
                    <input type="text" placeholder="task name.." onChange={(e)=>setTasks(e.target.value)} className="form-control" required/>
                </div>
                
                <div className="col">
                    <label>Project name: </label>
                    <select onChange={(e)=>setProjectName(e.target.value)}  required className="form-select">
                        {projects?.map((project)=>(
                            <option value={project._id} required>{project.name}</option>
                        ))}
                        
                    </select>
                </div>
                </div>
                <div>
                    <label>Owners</label>
                    {users?.map((user)=>(
                        <div>
                        <input type="checkbox" onChange={handleOwner} value={user._id} />  {user.name}
                        </div>
                    ))}
                </div>
                <div>
                    <label>Tags</label>
                        {tags?.map((tag)=>(
                            <div>
                            <input type="checkbox" onChange={handleCheckbox} value={tag.name}/> {tag.name}<br/>
                             </div>
                        ))}
                    
                </div>
                <div className="row">
                <div className="col">
                    <label>Teams</label>
                    <select onChange={(e)=>setTeamName(e.target.value)} required className="form-select">
                    {teams?.map((team)=>(
                        <option value={team._id}>{team.name}</option>
                    ))}
                    </select>
                </div>
                <div className="col">
                    <label>Status</label>
                    <select onChange={(e)=>setStatus(e.target.value)} className="form-select">
                        <option value="To Do" >To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                </div>
                </div>
                <div className="row">
                <div className="col"><label>Due Date</label>
                <input type='date' onChange={(e)=>setDueDate(e.target.val)} value={dueDate} required className="form-control"/>
                </div>
                <div className="col"><label>Time to Complete</label>
                <input type='number' onChange={(e)=>setTimeToComplete(e.target.value)} value={timeToComplete} required className="form-control"/>
                </div>
                </div>
               
                <div className="float-end py-3">
                <button onClick={onWork} className="btn btn-secondary mx-1">Cancel</button>
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                </div>
            </form>
            </div>
        </div>
    )
}