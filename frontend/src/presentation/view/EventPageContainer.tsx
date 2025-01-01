import {useEffect, useState} from "react";
import * as React from "react";
import { EventDetailsPage } from './EventDetails';

interface EventPageContainerProps {
  eventId: number;
  role: string;
  id: string;
}
const EventPageContainer: React.FC<EventPageContainerProps> = ({ eventId, role, id }) => {
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const clientId = localStorage.getItem('id')
    const url = `http://localhost:8080/api/events/${eventId}/details?role=${role}&clientId=${clientId}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => setEventDetails(data))
      .catch((error) => console.error("Error fetching event details:", error));

  }, [eventId, role, id]);

  if (!eventDetails) return <p>Loading...</p>;

  return <EventDetailsPage role={role} eventDetails={eventDetails} />;
};

export default EventPageContainer;
