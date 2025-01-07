import React from 'react';
import { RoleStrategy } from './RoleStrategy';

export class EventCreatorStrategy extends RoleStrategy {
    renderDetails(eventDetails:any) {
        return (
            <div>
                <h2>{eventDetails.title}</h2>
                <p>{eventDetails.description}</p>
                <p>Date: {eventDetails.date}</p>
                <p>Time: {eventDetails.time}</p>
                <p>Location: {eventDetails.location}</p>
                <p>Price: ${eventDetails.price}</p>
                <p>Tickets Available: {eventDetails.ticketsAvailable}</p>
                <div>
                    <button>Edit Event</button>
                    <button>Delete Event</button>
                </div>
            </div>
        );
    }
    renderHome() {
        return (
            <div>
                <h2>My Events</h2>
                <button>Create Event</button>
            </div>
        );
    }
}
