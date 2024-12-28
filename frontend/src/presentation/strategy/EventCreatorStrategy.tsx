import React from 'react';
import { RoleStrategy } from './RoleStrategy';

export class EventCreatorStrategy extends RoleStrategy {
    render(eventDetails) {
        return (
            <div>
                <h2>{eventDetails.title}</h2>
                <p>{eventDetails.description}</p>
                <p>Date: {eventDetails.date}</p>
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
}
