import { NavLink, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import TeamMember from "../components/TeamMember";
import { useState, useEffect } from "react";
import { ArrowBigLeftDash } from 'lucide-react';

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
        <div className="mx-5 w-75 py-4">
            <div className="mb-3 d-flex justify-content-start align-items-center">
            <ArrowBigLeftDash className="text-primary "/>
            <NavLink to="/teams" className="fs-5 fw-bold mx-2"> Back to Team</NavLink>
            
            </div>
            <div className="card" >
                <div className="card-header bg-primary">
                <h3 className=" text-white">{finded?.name} Team</h3>
                </div>
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
    )
}