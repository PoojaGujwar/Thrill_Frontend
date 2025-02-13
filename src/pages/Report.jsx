import useFetch from "../useFetch";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Report() {
  const {
    data: reports,
    loading: reportLoad,
    error: reportError,
  } = useFetch("https://workasana-backend-kappa.vercel.app/report/lastweek");
  const {
    data: pendingReport,
    loading: pendingLoad,
    error: pendingError,
  } = useFetch("https://workasana-backend-kappa.vercel.app/report/pending");
  const { data: fetchTasks, error: taskError } = useFetch(
    "https://workasana-backend-kappa.vercel.app/tasks"
  );
  const {data:projects,loading,error:projectError}=useFetch("https://workasana-backend-kappa.vercel.app/projects")
  const {data:teams,teamLoading,error:teamError}=useFetch("https://workasana-backend-kappa.vercel.app/teams")

  

  console.log(pendingReport, reports);
  const totalDay = fetchTasks?.reduce(
    (acc, curr) => acc + curr.timeToComplete,
    0
  );
  // const completeDay = reports?.map((task)=>task.)
  const totalTodo = fetchTasks?.filter((task) => task.status === "To Do");
  const totalInProgress = fetchTasks?.filter(
    (task) => task.status === "In Progress"
  );
  console.log(totalTodo,"To Do");

  const chartData = {
    labels: [ "Last Week Completed","Total Tasks"],
    datasets: [
      {
        label: "Report Data",
        data: [
          reports?.task.length,
          fetchTasks?.length
        ],
        backgroundColor: ["#9BD0F5", "#FFCE56", "#FFC0CB", "#00FF00"],
      },
    ],
  };
  const completeData = {
    labels: ["Pending Days", "Total Days",],
    datasets: [
      {
        label: " Task",
        data: [pendingReport, totalDay], 
        backgroundColor: ["#9BD0F5", "#FFCE56","#00FF00"],
        yAxis:{data:[0,1,2,3,4,5,6,7,8,9,10]},
      },
    ],
  };
 const [projectv,setProject] = useState('')
 const [teamV, setTeamName] = useState('')
 const completeProject = fetchTasks?.reduce((acc,curr)=>curr.project === projectv && curr.status === "Completed"?acc+1:acc,0)
 const completeTeams = fetchTasks?.reduce((acc,curr)=>curr.team === teamV && curr.status === "Completed"?acc+1:acc,0)
 console.log(completeTeams)

 const projectData = {
  labels: ["Project", "Total Tast",],
  datasets: [
    {
      label: " Task",
      data: [completeProject, fetchTasks?.length], 
      backgroundColor: ["#9BD0F5", "#FFCE56","#00FF00"],
      yAxis:{data:[0,1,2,3,4,5,6,7,8,9,10]},
    },
  ],
};
const teamData = {
  labels: ["Teams", "Total Tast",],
  datasets: [
    {
      label: " Task",
      data: [completeTeams, fetchTasks?.length], 
      backgroundColor: ["#9BD0F5", "#FFCE56","#00FF00"],
      yAxis:{data:[0,1,2,3,4,5,6,7,8,9,10]},
    },
  ],
};
  return (
    <div className="mx-5 py-4 w-100">
        <h1 className="mb-5">Report Review</h1>
        {reportError && <p>{reportError}</p>}
        <section>
          <h5>Filter by Project</h5>
        <select onChange={(e)=>setProject(e.target.value)} className="form-select col-md-6">
          <option>Select by Project</option>
          {projects?.map((project)=><option value={project._id}>{project.name}</option>)}
        </select>
       <div style={{height:"70%"}}>
        <Bar data={projectData}/>
        </div>
        </section>
        <div>
          <h5>Filter by Team</h5>
          <select onChange={(e)=>setTeamName(e.target.value)} className="form-select">
            <option>Select by Team</option>
            {teams?.map((team)=><option value={team._id}>{team.name}</option>)}
          </select>
          <div style={{height:"80%"}}><Bar data={teamData}/></div>
        </div>
        <div className="">
          <h5 className="">Total Work Done Last Week: </h5>
         <div className="" style={{height:"90%"}}><Bar data={chartData}/></div>
        </div>

        <div className="">
          <h5 className="align-self-start">Total Days of Work Pending: </h5>
          <div className="" style={{height:"90%"}}><Bar data={completeData} /></div>
        </div>

        
      </div>
   
  );
}
