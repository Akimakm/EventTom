import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./presentation/view/Login.tsx";
import EventList from "./presentation/view/EventList.tsx"; // List of all events
import EventDetailsWrapper from "./presentation/view/EventDetailsWrapper.tsx"; // Event details based on role
import HomeEvent from "./presentation/view/HomeEvent";
import HomeEventStrategy from "./presentation/strategy/HomeEventStrategy";
import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id/details" element={<EventDetailsWrapper />} />
          <Route path="/home" element={<HomeEvent />} />
          <Route path="/home-event-strategy" element={<HomeEventStrategy />} />


        </Routes>
      </Router>
  );
}

export default App;
