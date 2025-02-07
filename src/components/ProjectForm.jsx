import { X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectForm({onClose, onAddProject}){
    const modelRef =useRef()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    
    const closeModel =(e)=>{
        if(modelRef.current === e.target){
            onClose()
        }
    }

    const handleSubmitBtn =async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch("https://workasana-backend-kappa.vercel.app/projects",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name, description})
            })
            const data = await response.json()
            if(data){
                console.log(data)
                setMessage("Project added successfully")
                setName('')
                setDescription('')
                onAddProject(data)
                onClose()
            }
        }catch(error){
            throw new Error("Failed to fetched")
        }
    }

    return (
        <div ref={modelRef} onClick ={closeModel} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"  style={{ minHeight: "100vh", zIndex: "1050" }}>
            {message && <p className='alert alert-success'>{message}</p>}
            <div className='bg-light w-50 p-4 rounded'>
               <h3>Create New Project<button className="float-end" onClick={onClose}><X/></button></h3>
                <form className='' onSubmit={handleSubmitBtn}>
                <label>Name: </label>
                <input type='text' onChange={(e)=>setName(e.target.value)} value={name} className='form-control' required/>
                <br/>
                <label>Description: </label>
                <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='form-control'></textarea>
                <br/>
                <button type='submit'className='btn btn-primary float-end mx-2'>Create</button>
                <button type=''className='btn btn-secondary float-end' onClick={onClose}>Cancel</button>
                
            </form>
            </div>
            
        </div>
    )
}
 