import { NavLink, useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";
import TeamMember from "../components/TeamMember";
import { useState, useEffect } from "react";

export default function TeamDetails(){
    const {teamId} = useParams()
    const { data,loading, error } = useFetch(
        "https://workasana-backend-kappa.vercel.app/teams"
      );
      const [fetchTeam, setFetchTeam] = useState([])
      const [showValue, setShowValue] = useState(false)
      useEffect(()=>{
        if(data){
            setFetchTeam(data)
        }
      },[data])

      const addMember = (newMember) => {
        setFetchTeam((prevState) =>
            prevState.map((team) =>
                team._id === teamId
                    ? { ...team, members: [...team.members, newMember] }
                    : team
            )
        );
    }
      
      const finded = fetchTeam?.find((val)=>val._id === teamId)
     return (
        <div className="row mx-5 py-5">
            <div className="col-md-3">
            <h3 className="">ThrillTeamsUp</h3>
            <NavLink to="/teams" style={{textDecoration:"none"}}>Back to Team</NavLink>
            </div>
            <div className="col">
                
                <div className="card  col-md-6">
                <h3 className="bg-primary text-white w-100 card-text py-3 px-3">{finded?.name} Team</h3>
                    <div className="card-body">
                        <h6>MEMBERS: </h6>
                    <ul className="list-group list-group-flush mb-3">
                        {finded?.members.map((member)=>(
                            
                            <li className="list-group-item">{member}</li>
                        
                        ))}
                </ul>
                <NavLink className="btn btn-primary" onClick={()=>setShowValue(true)}>+ Member</NavLink>
                {showValue && <TeamMember onClose={()=>setShowValue(false)} teamId={finded._id} addMember={addMember}/>}
            </div>
            </div>
            </div>
        </div>
    )
}