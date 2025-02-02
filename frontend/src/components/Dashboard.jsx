import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-semibold">Welcome to Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
