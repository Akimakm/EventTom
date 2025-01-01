import {useState} from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

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
                console.log("Error: " + errorData);
                setMessage("Login failed: Wrong username or password");
            }
        } catch (error) {
            console.log("An error occurred: " + error.message);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
