import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/register", {
        name,
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/quiz");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow">
      <h2 className="text-2xl mb-4">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          className="w-full border p-2 mb-3"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="bg-green-500 text-white px-4 py-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;