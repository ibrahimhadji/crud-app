import { useState } from "react";

export function Login({ onLogin }) {
  const usernameValue = "admin";
  const passwordValue = "admin";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username !== usernameValue || passwordValue !== password) {
      alert("Password or username doesn't match");
    } else {
      alert("Successfully logged in!");
      onLogin();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form className="block " onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="custom-input"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="custom-input"
            placeholder="Password"
          />
        </div>
        <input type="submit" value="Login" className="custom-input" />
      </form>
    </div>
  );
}
