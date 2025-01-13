import React from 'react';
import { RoleStrategy } from './RoleStrategy';
import logo from "../img/logo.png"
import "../styles/HomeEvent.css"
import "../styles/EventDetails.css"

export class EventCreatorStrategy extends RoleStrategy {

    renderDetails(eventDetails:any) {
        return (
            <div className="event-details-container">
                <h2>{eventDetails.title}</h2>
                <p>{eventDetails.description}</p>
                <p>Date: {eventDetails.date}</p>
                <p>Time: {eventDetails.time}</p>
                <p>Location: {eventDetails.location}</p>
                <p>Price: ${eventDetails.price}</p>
                <p>Fees: ${eventDetails.fee}</p>
                <p>Tickets Available: {eventDetails.ticketsAvailable}</p>
                <div className="buttons-container">
                    <button>Edit Event</button>
                    <button>Delete Event</button>
                </div>
            </div>

        );
    }
    renderHome(): React.JSX.Element {
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
                                    <li>
                                        <a href="/create-event" className="create-event-btn-menu">
                                            Create Event
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="hero-area hero-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 offset-lg-2 text-center">
                                <div className="hero-text">
                                    <h1>Welcome to the Event Creator Dashboard</h1>
                                    <h2>Manage your events by creating, editing, or deleting them.</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
