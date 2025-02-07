import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signup() {
   const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name,setName] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate()
    
    const formData ={
      name,email,password
    }
    const handleSubmitBtn =async(e)=>{
      e.preventDefault()
      try{
        const response = await fetch("https://workasana-backend-kappa.vercel.app/auth/signup",{
          method:"POST",
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify(formData)
        })
        const data = await response.json()
        if(data.error){
          setMessage(data.error)
        }else{
          navigate('/')
        }
      }catch(error){
        throw new Error
      }
    }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
      
    <form onSubmit={handleSubmitBtn} className="my-4">
    <h1 className="mb-4 text-center">ThrillTeamsUp</h1>
      {message && <p className="alert alert-danger">{message}</p>}
      <div className="mb-3">
    <label className="mb-1">Name </label><input type="text" placeholder="Enter your  name" className="form-control" onChange={(e)=>setName(e.target.value)} value={name}/> 
    </div>
    <div className="mb-3">
    <label className="mb-1">Email</label><input type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control"/></div>
    <div className="mb-3">
    <label className="mb-1">Password</label><input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} value={password} className="form-control"/></div>
    <button type="submit" className="btn btn-primary w-100 text-center">Signup</button>
    </form>
    </div>
    </div>
  )
}

export default Signup