import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login(email, password);
      if (res.user.role === "user") {
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      } else {
        setError("Unauthorized!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">User Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="email" placeholder="Email" className="w-full p-2 border mb-2"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 border mb-2"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
