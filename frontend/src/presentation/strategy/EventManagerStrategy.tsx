import * as React from 'react';
import { RoleStrategy } from './RoleStrategy';

export class EventManagerStrategy extends RoleStrategy {
    renderDetails(eventDetails) {
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
                <p>Tickets Sold: {eventDetails.ticketsSold}</p>
                <p>Tickets Remaining: {eventDetails.ticketsAvailable - eventDetails.ticketsSold}</p>
                <div>
                    <div style={{ width: '100%', background: '#ddd' }}>
                        <div style={{ width: `${progress}%`, background: 'green', height: '20px' }} />
                    </div>
                    <p>{thresholdStatus}</p>
                </div>
            </div>
        );
    }
    renderHome() {
        return <h2>Events</h2>;
    }
}
