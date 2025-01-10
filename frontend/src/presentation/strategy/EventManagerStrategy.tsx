import React from 'react';
import { RoleStrategy } from './RoleStrategy';
import logo from "../img/logo.png"
import "../styles/HomeEvent.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
export class EventManagerStrategy extends RoleStrategy {
    renderDetails(eventDetails:any) {
        const progress = eventDetails.progress;
        const thresholdStatus =
            progress >= eventDetails.threshold
                ? `${Math.round(progress - eventDetails.threshold)}% above threshold`
                : `${Math.round(eventDetails.threshold - progress)}% below threshold`;

        return (
            <div>
                <h2>{eventDetails.title}</h2>
                <p>{eventDetails.description}</p>
                <p>Date: {eventDetails.date}</p>
                <p>Time: {eventDetails.time}</p>
                <p>Location: {eventDetails.location}</p>
                <p>Price: ${eventDetails.price}</p>
                <p>Fees: ${eventDetails.fee}</p>
                <p>Tickets Sold: {eventDetails.ticketsSold}</p>
                <p>Tickets Remaining: {eventDetails.ticketsAvailable}</p>
                <div>
                    <div style={{ width: '100%', background: '#ddd' }}>
                        <div style={{ width: `${progress}%`, background: 'green', height: '20px' }} />
                    </div>
                    <p>{thresholdStatus}</p>
                </div>
            </div>
        );
    }
    renderHome({ toggleNotifications, showNotifications, notifications }:{ toggleNotifications: () => void; showNotifications: boolean; notifications: string[]; }): React.JSX.Element {
        return (
            <div>
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
                                        <a href="/events">Event</a>
                                    </li>
                                </ul>
                            </nav>

                            {/* Icons */}
                            <div className="header-icons">
                                <a className="mobile-hide notification-icon" >
                                    <div
                                        className="notification-wrapper"
                                        onClick={toggleNotifications}
                                    >
                                        <i className="fas fa-bell"></i>
                                        {showNotifications && (
                                            <div className="notification-dropdown">
                                                <ul>
                                                    {notifications.map((notif: string, index: number) => (
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

                {/* Hero Section */}
                <div className="hero-area hero-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 offset-lg-2 text-center">
                                <div className="hero-text">
                                    <h1>Welcome to the Event Manager Dashboard</h1>
                                    <h2>Track ticket sales and monitor event performance.</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
