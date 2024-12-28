import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const credentials = {
            username,
            password,
        };

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("sessionId", data.sessionId); // Store session ID in localStorage
                localStorage.setItem("username", data.username); // Store username
                localStorage.setItem("role", data.role); // Store role (add this to backend response)
                localStorage.setItem("id", data.id); // Store clientId for customer

                setMessage("Login successful! Redirecting...");
                navigate("/events");
            } else {
                const errorData = await response.text();
                setMessage("Login failed: " + errorData);
            }
        } catch (error) {
            setMessage("An error occurred: " + error.message);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1em" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "1em" }}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: "100%", padding: "0.5em" }}
                    />
                </div>
                <div style={{ marginBottom: "1em" }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "0.5em" }}
                    />
                </div>
                <button type="submit" style={{ padding: "0.5em", width: "100%" }}>
                    Login
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
