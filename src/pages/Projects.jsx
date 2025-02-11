import { useEffect, useState } from "react"
import Header from "../components/Header"
import ProjectForm from "../components/ProjectForm"
import useFetch from "../useFetch"
import { NavLink, useLocation, useParams, useSearchParams } from "react-router-dom"
import ProjectView from "./ProjectView"
const Projects =()=>{
    const {data:projects,loading,error:projectError}=useFetch("https://workasana-backend-kappa.vercel.app/projects")
    const [showProject, setShowValue] = useState(false)
    const [fetchProject, setFetchProject] = useState([])
    
    useEffect(()=>{
      if(projects){
        setFetchProject(projects)
      }
    },[projects])
    const handleAddProject =(newProject)=>{
      setFetchProject(prevValue => [...prevValue, newProject]);
    }
    return(
        <>
           
        <div className="row mx-5">
            <div className="col flex flex-col">
            <h3 className="mb-3">Project <NavLink className="btn btn-primary float-end" onClick={()=>setShowValue(true)}>+ New Project</NavLink></h3>
            <div className="row">
            {fetchProject?.map((project, index) => (
              <div className="col-md-4 col-sm-6">
                <NavLink to={`/project/${project._id}`} state={`${project.name}`}style={{textDecoration:"none"}}>
                <div
                  className="card mb-3"
                >
                  <div className="card-body w-100 h-100"style={{ backgroundColor: "#e3e3eb"}}>
                    <h6 className="card-text">{project.name}</h6>
                    <span className="card-text fw-light fs-small">
                      description: {project.description}
                    </span>
                  </div>
                </div>
                </NavLink>
              </div>
              
            ))}
          </div>
            {showProject && <ProjectForm onClose={()=>setShowValue(false)} onAddProject={handleAddProject}/>}
            </div>
          
        </div>
        </>
    )
}
export default Projects