import { Link,NavLink} from "react-router-dom";
import useFetch from "../useFetch";
import TeamForm from "../components/TeamForm";
import { useEffect, useState } from "react";

export default function Teams(){
    const { data: teams, error: teamsError } = useFetch(
        "https://workasana-backend-kappa.vercel.app/teams"
      );
      const { data: fetchTasks, error: taskError } = useFetch(
        "https://workasana-backend-kappa.vercel.app/tasks"
      );
      const { data: users, error: usersError } = useFetch(
        "https://workasana-backend-kappa.vercel.app/users"
      );
      const [fetchTeam, setFetchTeam] = useState([])
      useEffect(()=>{
        if(teams){
setFetchTeam(teams)
        }
      },[teams])
      const [showValue, setShowValue] = useState(false)
      console.log(fetchTasks,"teams",teams,"user",users)
      const handleAddTeam =(newTeam)=>{
        console.log(fetchTeam)
        setFetchTeam(prevValue=> [...prevValue, newTeam])
      }
     
    return(
        <div className="mx-5 py-4">
        <div className="col">
            <h3>Teams <NavLink className="btn btn-primary float-end" onClick={()=>setShowValue(true)}>+ New Teams</NavLink></h3>
            <div className="row py-3">
            {fetchTeam?.map((team)=>
            (
              <div className="col-md-4 col-sm-6">
              <Link to={`/teams/${team._id}`} style={{textDecoration:"none"}}>
                <div className="card mb-3 " style={{ backgroundColor: "#e3e3eb" }}>
                <h3 className="bg-primary text-light py-2 px-2">{team.name}</h3>
                 <div className="card-body">
                 <span style={{ display: "flex", alignItems: "center" }}>
  {team.members.slice(0, 2).map((member, index) => (
    <span
      key={index}
      style={{
        display: "inline-block",
        width: "35px", 
        height: "35px",
        borderRadius:"50%",
        backgroundColor: index === 0 ? "#3498db" : "#e74c3c", 
        color: "#fff",
        textAlign: "center",
        lineHeight: "35px",
        
      }}
    >
      {member[0].toUpperCase()}
    </span>
  ))}

  
  {(() => {
    const remainingMembers = team.members.slice(2); 
    const totalLength = remainingMembers.reduce((sum, member) => sum + 1, 0); 
    return (
      <span
        style={{
          display: "inline-block",
          width: "35px",  
          height: "35px",
          borderRadius:"50%",
          backgroundColor: "#2ecc71",  
          color: "#fff",  
          textAlign: "center",
          lineHeight: "35px",  
        }}
      >
        {totalLength} 
      </span>
    );
  })()}
</span>


               </div>
               </div>
               </Link>
            </div>
            
            ))}
            </div>
            {showValue && <TeamForm onCloseTeam={()=>setShowValue(false)} onAddTeam={handleAddTeam}/>}
        </div>
        </div>
    )
}