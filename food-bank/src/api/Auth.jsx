import React, { useState } from "react";

function Auth(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Implement login functionality
    console.log(`Logging in as ${username}`);
    props.onLogin(username);
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log(`Logging out ${username}`);
    setUsername("");
    setPassword("");
    props.onLogout();
  };

  return (
    <div>
      {props.user ? (
        <div>
          <p>Logged in as {props.user}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Auth;
