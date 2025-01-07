import React, {useEffect, useState} from "react";

import { Link } from "react-router-dom";

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/events")
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map((event:any) => (
                    <li key={event.id}>
                        <Link to={`/events/${event.id}/details`}>{event.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
