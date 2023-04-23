import React, { useState } from "react";
import "../css/Login.css";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name) {
          alert('Please enter your full name.');
          return;
        }
        
        fetch('http://localhost:3000/userCredentials/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: pass })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // If the response is successful, redirect the user to the login page
            window.location.href = '/login';
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
    }

    const handleFormSwitch = (formName) => {
        props.onFormSwitch(formName);
      };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => handleFormSwitch("login")}>Already have an account? Login here.</button>
    </div>
    )
}
export default Register;