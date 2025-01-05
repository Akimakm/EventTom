import React, {useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../img/logo.png';

import "../styles/HomeEventStrategy.css";

const HomeEventStrategy = () => {
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
                                        <a href="Home.js">
                                            <img className="imagelogo" src={logo} />
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
                                        <a className="mobile-hide notification-icon">
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
                                    <div className="wrap">
                                        <div className="search">
                                            <input
                                                type="text"
                                                className="searchTerm"
                                                placeholder="Search Event"
                                            />
                                            <button type="submit" className="searchButton">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <h1>
                                        Unforgettable Events, Festive Atmosphere! Your Ticket sale
                                        easier than ever!
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest News */}
            <div className="latest-news pt-150 pb-150">
                <div className="container">
                    <div>
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="section-title">
                                <h3>
                                    <span className="orange-text">Coming</span> Events
                                </h3>
                                <p>
                                    EventTom is the ideal platform for all ticket lovers and event
                                    organisers. Join the EventTom community and secure the best
                                    seats for your favourite events!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Event Items */}
                    <div className="row card">
                        {[1, 2, 3].map((_item, index) => (
                            <div className="col-lg-4 col-md-6 col-12" key={index}>
                                <div className="single-latest-news">
                                    <a href="/">
                                        <div className="latest-news-bg news-bg-1"></div>
                                    </a>
                                    <div className="news-text-box">
                                        <h3>
                                            <a href="/">Silverstergala 2024</a>
                                        </h3>
                                        <p className="blog-meta">
                        <span className="date">
                            <i className="fas fa-calendar"></i> 27 December, 2025
                        </span>
                                            <br />
                                            <span className="location">
                            <i className="fas fa-map-marker-alt"></i> Berlin (De)
                        </span>
                                            <br />
                                            <span className="price">
                            <i className="fas fa-ticket-alt"></i> Prices : 25€
                        </span>
                                            <br />
                                            <span className="tickets">
                            <i className="fas fa-ticket-alt"></i> Number of Tickets: 120
                        </span>
                                        </p>
                                        <a href="/" className="read-more-btn">
                                            Details <i className="fas fa-angle-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeEventStrategy;
