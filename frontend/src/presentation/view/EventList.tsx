import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../img/logo.png";
import "../styles/EventList.css";
import NotificationWebSocket from "../../NotificationWebSocket";

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    ticketBasePrice: number;
    numberOfTickets: number;
}

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);


    useEffect(() => {
        fetch("http://44.208.179.224:8080/api/events")
            .then((response) => response.json())
            .then((data: Event[]) => setEvents(data))
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    // Real-time WebSocket updates
    useEffect(() => {
        let client: any;

        const initializeWebSocket = () => {
            client = NotificationWebSocket((notification:any) => {
                console.log("Notification received:", notification);
                if (notification.type === "NEW_EVENT"){
                    setEvents((prevEvents) => [...prevEvents, notification.event]);
                } else if (notification.type === "EVENT_UPDATE") {
                    setEvents((prevEvents) =>
                        prevEvents.map((event) =>
                            event.id === notification.event.id
                                ? { ...event, numberOfTickets: notification.event.numberOfTickets }
                                : event
                        )
                    );
                }
            });
        };

        initializeWebSocket();
        return () => client.deactivate(); // Cleanup WebSocket connection on component unmount
        }, []);


    return (
        <div>
            {/* Header */}
            <div className="top-header-area-event" id="sticker">
                <div className="container">
                    <div className="header-content-event">
                        <div className="site-logo-event">
                            <a href="/home">
                                <img className="imagelogo" src={logo} alt="Logo" />
                            </a>
                        </div>
                        <nav className="main-menu-event">
                            <ul className="menu-center-event">
                                <li>
                                    <a href="/home">Home</a>
                                </li>
                                <li className="current-list-item">
                                    <a href="/events">Event</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Hero Area */}
            <div className="hero-area-event hero-bg">
                <div className="container">
                    <div className="hero-text">
                        <h1>
                            Unforgettable Events, Festive Atmosphere! Your Ticket sale easier than
                            ever!
                        </h1>
                    </div>
                </div>
            </div>

            {/* Latest News */}
            <div className="latest-news-event pt-150 pb-150">
                <div className="container">
                    <div className="section-title">
                        <h3> Coming Events</h3>
                        <p>
                            EventTom is the ideal platform for all ticket lovers and event
                            organisers. Join the EventTom community and secure the best seats for
                            your favourite events!
                        </p>
                    </div>
                    <div className="card-container">
                        {events.map((event) => (
                            <div className="card" key={event.id}>
                                <div className="image-placeholder"></div>
                                <div className="card-content">
                                    <h3>
                                        {event.title}
                                    </h3>
                                    <p>
                                        <i className="fas fa-calendar"></i> {event.date}
                                    </p>
                                    <p>
                                        <i className="fas fa-map-marker-alt"></i> {event.location}
                                    </p>
                                    <p>
                                        <i className="fas fa-ticket-alt"></i> Price:{" "}
                                        {event.ticketBasePrice} €
                                    </p>
                                    <p>
                                        <i className="fas fa-ticket-alt"></i> Tickets:{" "}
                                        {event.numberOfTickets}
                                    </p>
                                    <a href={`/events/${event.id}/details`} className="read-more-btn">
                                        Details <i className="fas fa-angle-right"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventList;
