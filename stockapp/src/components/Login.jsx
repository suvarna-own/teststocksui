import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Demo credentials
  const validUsername = "admin";
  const validPassword = "123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === validUsername &&
      password === validPassword
    ) {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="login-container border-red-700 rounded-lg shadow-lg p-6 bg-white  flex  items-center justify-center">
      <form className="border border-gray-300 rounded-lg shadow-md p-6 w-auto" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input className="form-control mb-4"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input className="form-control mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary" type="submit">
          Login
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;