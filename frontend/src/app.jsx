import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUser from "./pages/auth/LoginUser";
import LoginAdmin from "./pages/auth/LoginAdmin";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginUser />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/dashboard" element={<ProtectedRoute role="user"><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
