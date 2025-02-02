import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token"); // Asumsi token disimpan di localStorage
  
  if (!token) {
    // Tidak ada token, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding token untuk mengecek role
  if (decodedToken.role !== role) {
    // Jika role tidak sesuai, redirect ke halaman yang sesuai
    return <Navigate to={role === "admin" ? "/admin/login" : "/login"} />;
  }

  return children;
};

export default ProtectedRoute;
