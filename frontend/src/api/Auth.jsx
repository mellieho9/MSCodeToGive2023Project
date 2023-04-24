import React, { useState } from "react";
import { Button, Input, Stack } from "@chakra-ui/react";

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
          <Button colorScheme="orange" onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <div>
          <Stack spacing={2}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button colorScheme="brand" bg="#FF7A00" onClick={handleLogin}>Login</Button>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default Auth;
