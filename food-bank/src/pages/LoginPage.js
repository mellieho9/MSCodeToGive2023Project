import React, { useState } from "react";
import Auth from '../api/Auth';
import { useHistory } from "react-router-dom";
import "../css/Login.css";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/userCredentials/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        props.onLogin();
        history.push("/");
      } else {
        setErrorMessage("Incorrect email or password.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleFormSwitch = (formName) => {
    props.onFormSwitch(formName);
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <button
        className="link-btn"
        onClick={() => handleFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
}
export default Login;
