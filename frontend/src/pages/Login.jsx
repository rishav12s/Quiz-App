import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/quiz");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow">
      <h2 className="text-2xl mb-4">Login</h2>

      <form onSubmit={handleLogin}>
        <input
          className="w-full border p-2 mb-3"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          Login
        </button>
      </form>

      <p className="mt-3">
        New user? <Link to="/register" className="text-blue-500">Register</Link>
      </p>
    </div>
  );
}

export default Login;