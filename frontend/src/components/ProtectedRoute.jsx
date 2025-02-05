import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  let decodedToken;
  try {
    decodedToken = JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return <Navigate to="/login" />;
  }

  if (decodedToken.role !== role) {
    return <Navigate to={role === "admin" ? "/admin/login" : "/login"} />;
  }

  return children;
};

export default ProtectedRoute;
