import useFetch from "../useFetch";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { NavLink } from "react-router-dom";

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
  console.log(pendingReport);
  const totalDay = fetchTasks?.reduce(
    (acc, curr) => acc + curr.timeToComplete,
    0
  );
  const totalTodo = fetchTasks?.filter((task) => task.status === "To Do");
  const totalInProgress = fetchTasks?.filter(
    (task) => task.status === "In Progress"
  );
  console.log(reports);

  const chartData = {
    labels: [ "Pending Work days","Total Days"],
    datasets: [
      {
        label: "Report Data",
        data: [
          totalDay - pendingReport,
          totalDay
        ],
        backgroundColor: ["#9BD0F5", "#FFCE56", "#FFC0CB", "#00FF00"],
      },
    ],
  };
  const completeData = {
    labels: ["Completed Task","Pending Tasks", "Total Task",],
    datasets: [
      {
        label: " Task",
        data: [fetchTasks?.length - reports?.length,pendingReport, fetchTasks?.length], 
        backgroundColor: ["#9BD0F5", "#FFCE56","#00FF00"],
        yAxis:{data:[0,1,2,3,4,5,6,7,8,9,10]},
      },
    ],
  };
  return (
    <div className="row mx-5 py-5 ">
      <div className="col-md-3">
        <header>
          <h3 className="" >ThrillTeamsUp</h3>
          <NavLink to="/home" style={{textDecoration:"none"}}>Back to home</NavLink>
        </header>
      </div>
      <div className="col-md-9 d-flex flex-col justify-content-center align-items-center bg-light">
        <h1 className="mb-5">Report Review</h1>
        {reportError && <p>{reportError}</p>}

        <div className="d-flex flex-col py-3">
          <h3 className="align-self-start">Total Work Done Last Week: </h3>
          <div className="py-3"><Bar data={completeData} /></div>
        </div>

        <div className="d-flex flex-col  py-3">
          <h3 className="align-self-start">Total Days of Work Pending: </h3>
          <div><Bar data={chartData} /></div>
        </div>
      </div>
    </div>
  );
}
