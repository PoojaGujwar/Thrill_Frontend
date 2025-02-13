import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

function Login() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage]= useState('')
  const navigate = useNavigate()

  const handleSubmitBtn =async(e)=>{
   e.preventDefault()
   try{
    const response = await fetch("https://workasana-backend-kappa.vercel.app/auth/login",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({email, password})
    })
    const data = await response.json()
    if(data.token){
      console.log(data)
      localStorage.setItem("loginToken",data.token)
      navigate('/home')
    }else{
      setMessage(data.error)
    }
    
   }catch(error){
    throw new Error(error)
   }
  }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
     
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmitBtn} className="my-4">
      <h1 className="mb-4 text-center">ThrillTeamsUp</h1>
      <div className="mb-3"><label className="mb-1">Email: </label><input type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control"/></div>
      
      <div className="mb-3"><label className="mb-1">Password: </label><input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} className="form-control"/></div>
      <div className="">
      <button type="submit" className="btn btn-primary w-100 mt-2">Login</button><br/>
      </div>
      </form>
      <div className="mt-3 text-center">
        <span>Don't have an account? </span>
      <NavLink to="/signup" className="text-decoration-none">Signup</NavLink>
      </div>
    </div>
    </div>
  )
}

export default Login