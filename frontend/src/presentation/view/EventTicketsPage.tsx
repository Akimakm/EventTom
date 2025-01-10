import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../img/logo.png";
import "../styles/EventTicketsPage.css";

const EventTicketsPage = () => {
    // State to toggle notification dropdown
    const [showNotifications, setShowNotifications] = useState(false);

    // Sample notifications
    const notifications = [
        "Event 1 is starting soon!",
        "You have 3 new ticket updates.",
        "Reminder: Check out the upcoming events!",
    ];

    // Tickets data
    const tickets = [
        {
            event: "Concert XYZ",
            date: "2025-01-15",
            time: "18:00",
            location: "Berlin Arena",
            ticketsCount: 2,
        },
        {
            event: "Festival ABC",
            date: "2025-02-20",
            time: "14:00",
            location: "Munich Park",
            ticketsCount: 4,
        },
        {
            event: "Concert XYZ",
            date: "2025-01-15",
            time: "18:00",
            location: "Berlin Arena",
            ticketsCount: 2,
        },
    ];

    // Toggle notification dropdown
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="event-tom-page">
            {/* Header */}
            <div className="top-header-area" id="sticker">
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <div className="site-logo">
                            <a href="/home">
                                <img className="imagelogo" src={logo} alt="EventTom" />
                            </a>
                        </div>

                        {/* Navigation */}
                        <nav className="main-menu">
                            <ul className="menu-center">
                                <li className="current-list-item">
                                    <a href="/home">Home</a>
                                </li>
                                <li>
                                    <a href="/event">Event</a>
                                </li>
                            </ul>
                        </nav>

                        {/* Icons */}
                        <div className="header-icons">
                            <a className="shopping-cart" href="/">
                                <i className="fas fa-shopping-cart"></i>
                            </a>
                            {/* Notification Bell */}
                            <a className="mobile-hide notification-icon" href="/">
                                <div
                                    className="notification-wrapper"
                                    onClick={toggleNotifications}
                                >
                                    <i className="fas fa-bell"></i>
                                    {showNotifications && (
                                        <div className="notification-dropdown">
                                            <ul>
                                                {notifications.map((notif, index) => (
                                                    <li key={index}>{notif}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Area */}
            <div className="hero-area hero-bg your-ticket">
                <div className="container">
                    <div className="hero-text">
                        <h1>Welcome to EventTom</h1>
                    </div>
                </div>
            </div>

            {/* Tickets Section */}
            <div className="tickets-container">
                <h2>Your Tickets</h2>
                {tickets.map((ticket, index) => (
                    <div className="ticket-card" key={index}>
                        <div className="ticket-details">
                            <p>
                                <strong>Event:</strong> {ticket.event}
                            </p>
                            <p>
                                <strong>Date & Time:</strong> {ticket.date} at {ticket.time}
                            </p>
                            <p>
                                <strong>Location:</strong> {ticket.location}
                            </p>
                        </div>
                        <div className="ticket-count">
                            <p>
                                <strong>Tickets:</strong> {ticket.ticketsCount}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventTicketsPage;
