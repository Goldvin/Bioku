import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <ul className="mt-4">
        <li><Link to="/dashboard" className="block p-2 hover:bg-gray-700">Home</Link></li>
        <li><Link to="/dashboard/settings" className="block p-2 hover:bg-gray-700">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
