import React, { useState } from "react";
import logo from '../img/logo.png';
import "../styles/HomeEventCreator.css";

const HomeEventCreator = () => {
    // State to toggle dropdown visibility
    const [showNotifications, setShowNotifications] = useState(false);

    // Sample notifications
    const notifications = [
        "Event 1 is starting soon!",
        "You have 3 new ticket updates.",
        "Reminder: Check out the upcoming events!"
    ];

    // Toggle dropdown visibility
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleCreateEvent = () => {
        // Action à effectuer lors du clic sur le bouton
        console.log("Redirecting to Create Event page...");
        // redirection vers create event :
        window.location.href = "/create-event";
    };

    return (
        <div>
            {/* Header */}
            <div className="top-header-area" id="sticker">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="main-menu-wrap">
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
                                            <li>
                                                <button
                                                    className="create-event-btn-menu"
                                                    onClick={handleCreateEvent}
                                                >
                                                    Create Event
                                                </button>
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
                    </div>
                </div>
            </div>

            {/* Hero Area */}
            <div className="hero-area hero-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 offset-lg-2 text-center">
                            <div className="hero-text">
                                <div className="hero-text-tablecell">
                                    <h1>Welcome To EventTom</h1>
                                    <button
                                        className="create-event-btn"
                                        onClick={handleCreateEvent}
                                    >
                                        Create Event
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeEventCreator;
