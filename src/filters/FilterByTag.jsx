import useFetch from "../useFetch"
import { NavLink } from "react-router-dom"
import { useState } from "react"

export default function FilterByTag({allData, setSelectedOwner}){
    const {data:users,error:usersError}=useFetch("https://workasana-backend-kappa.vercel.app/users")
    const {data:tags,error:tagError}=useFetch("https://workasana-backend-kappa.vercel.app/tags")

    const handleOwner = (e) =>{
        const {value} = e.target
        if(value === "All"){
            setSelectedOwner(allData)
        }else{
            const filterByOwnre = allData.filter((val)=>val.owners.includes(value))
            setSelectedOwner(filterByOwnre)
        }
        console.log(value)
      }
      const handleTag =(e)=>{
        const {value} = e.target
        if(value === "All"){
            setSelectedOwner(allData)
        }else{
            const filterByTag = allData.filter((task)=>task.tags.includes(value))
            setSelectedOwner(filterByTag)
            console.log(filterByTag)
        }
        console.log(value)
      }

    return (
        <div>
            <div className="py-3">
            <p>Filters: </p>
            <div className="row">
                <div className="col-md-6">
                <select onChange={handleOwner} className="form-select">
                    <option defaultChecked value="All">By Owner</option>
                    {users?.map((user)=>(<option value={user._id}>{user.name}</option>))}
                </select>
                </div>
                <div className="col-md-6">
                <select onChange={handleTag} className="form-select  ">
                    <option defaultChecked value={'All'}>By Tag</option>
                    {tags?.map((tag)=><option value={tag.name}>{tag.name}</option>)}
                </select>
                </div>
            </div>
        </div>
        </div>
    )
}