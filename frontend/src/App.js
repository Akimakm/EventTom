import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./presentation/view/Login.tsx";
import EventList from "./presentation/view/EventList.tsx"; // List of all events
import EventDetailsWrapper from "./presentation/view/EventDetailsWrapper.tsx"; // Event details based on role
import CreateEvent from "./presentation/view/CreateEvent.tsx"; // Create event based on role
import './App.css';

// Simulate fetching role from local storage
const getRole = () => localStorage.getItem('role');

// ProtectedRoute component to enforce role-based access
const ProtectedRoute = ({ children, role }) => {
    return getRole() === role ? children : <Navigate to="/" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/events/:id/details" element={<EventDetailsWrapper />} />
                <Route path="/create-event" element={<ProtectedRoute role="EVENTCREATOR"><CreateEvent /></ProtectedRoute>}/>
            </Routes>
        </Router>
    );
}

export default App;
