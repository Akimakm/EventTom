import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e:any) => {
        e.preventDefault();

        const credentials = {
            username,
            password,
        };

        try {
            const response = await fetch("http://44.208.179.224:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("sessionId", data.sessionId);
                localStorage.setItem("username", data.username);
                localStorage.setItem("role", data.role);
                localStorage.setItem("id", data.id);

                setMessage("Login successful! Redirecting...");
                navigate("/home");
            } else {
                const errorData = await response.text();
                setMessage("Login failed: " + errorData);
                console.log(errorData);
            }
        } catch (error:any) {
            setMessage("An error occurred: " + error.message);
        }
    };

    return (
        <div className="login-page">
            {/* Logo */}
            <div className="logo-container">
                <img src={logo} alt="EventTom" className="logo" />
            </div>

            {/* Login Form */}
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                {message && <p className="login-message">{message}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
