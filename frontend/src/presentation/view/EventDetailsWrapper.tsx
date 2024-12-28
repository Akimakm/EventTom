import React from "react";
import { useParams } from "react-router-dom";
import EventPageContainer from "./EventPageContainer";

const EventDetailsWrapper = () => {
    const { id } = useParams(); // Extract event ID from route
    const role:any = localStorage.getItem("role") || "customer"; // Fallback to 'customer'
    const clientId : any = localStorage.getItem("clientId"); // Optional, only for customers

    return <EventPageContainer eventId={id} role={role} clientId={clientId} />;
};

export default EventDetailsWrapper;