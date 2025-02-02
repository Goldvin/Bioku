import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

export default { login, logout };
