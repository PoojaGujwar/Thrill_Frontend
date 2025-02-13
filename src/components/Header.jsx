import React from 'react'
import { NavLink} from 'react-router-dom'

function Header() { 
  return (
    <header className='pt-4'style={{backgroundColor:"#efeff6",height:"mvh-100"}} >
        <nav>
            <div className='container'>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                <h3>ThrillTeamsUp</h3>
                <ul className="" >
                    <li className="list-group-item py-2"><NavLink  to="/home" style={{textDecorationLine:"none"}}>Dashboard</NavLink></li>
                    <li className="list-group-item py-2"><NavLink  to="/project" style={{textDecorationLine:"none"}}>Projects</NavLink></li>
                    <li className="list-group-item py-2"><NavLink  to="/tasks" style={{textDecorationLine:"none"}}>Tasks</NavLink></li>
                    <li className="list-group-item py-2"><NavLink to="/teams" style={{textDecorationLine:"none"}}>Teams</NavLink></li>
                    <li className="list-group-item py-2"><NavLink  to="/report"style={{textDecorationLine:"none"}}>Reports</NavLink></li>
                    <li className="list-group-item py-2"><NavLink  to="/" style={{textDecorationLine:"none"}}>Logout</NavLink></li>
                </ul>
                
            </div>
            </div>
        </nav>
    </header>
  )
}

export default Header