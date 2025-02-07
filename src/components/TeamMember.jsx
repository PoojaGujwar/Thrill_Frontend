import { X } from "lucide-react";
import { useState } from "react";

export default function TeamMember({onClose, teamId,addMember}){
    
const[memberName,setMenmebrName] = useState('')
const [message, setMessage] = useState('')


    const handleSubmitBtn =async(e)=>{
        e.preventDefault()
        try{
const response = await fetch(`https://workasana-backend-kappa.vercel.app/teams/${teamId}`,{
    method:"POST",
    headers:{
        'Content-Type':"application/json"
    },
    body:JSON.stringify({"members":memberName})
})
const data = await response.json()
if(data){
    setMenmebrName('')
    setMessage("Member Added Successfully")
    addMember(memberName)
}

        }catch(error){
            throw new Error("Failed to fetch")
        }finally{
            setTimeout(()=>{setMessage('')},2000)
        }

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-content-center  align-items-center">
            
            <div className="bg-light px-3 py-3 flex flex-col" >
            <h1>Add New Member <button onClick={onClose} className="float-end"><X/></button></h1>
            {message && <p className="alert alert-success">{message}</p>}
            <form className="py-3" onSubmit={handleSubmitBtn}>
            <div className="py-2">
            <label className="mb-1">Members Name</label>
            <input type="text" placeholder="Member Name" className="form-control" onChange={(e)=>setMenmebrName(e.target.value)} value={memberName}/>
            </div>
            <div className="py-3 float-end">
            <button className="btn btn-secondary mx-1" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary mx-1">Add</button>
            </div>
        </form>
        </div>
        </div>
    )
}