// EventDetailsPage.js
import React from 'react';
import CustomerStrategy from '../strategy/CustomerStrategy';
import { EventCreatorStrategy } from '../strategy/EventCreatorStrategy';
import { EventManagerStrategy } from '../strategy/EventManagerStrategy';

export const EventDetailsPage = ({ role, eventDetails }) => {
    const getStrategy = (role) => {
        const lowerCaseRole = role.toLowerCase();
        switch (lowerCaseRole) {
            case 'customer':
                return <CustomerStrategy eventDetails={eventDetails} />;
            case 'eventcreator':
                return new EventCreatorStrategy();
            case 'eventmanager':
                return new EventManagerStrategy();
            default:
                throw new Error('Unknown role');
        }
    };

    const strategy = getStrategy(role);
    return strategy instanceof React.Component ? strategy.render(eventDetails) : strategy;
};
