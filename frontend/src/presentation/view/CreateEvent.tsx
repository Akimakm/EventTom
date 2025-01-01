import * as React from "react";
import {useState} from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import "./CreateEvent.css";

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        ticketBasePrice: '',
        numberOfTickets: '',
        threshold: '',
        time: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        fetch('http://localhost:8080/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create event');
                }
                return response.json();
            })
            .then(() => {
                alert('Event created successfully!');
                setEventData({
                    title: '',
                    description: '',
                    date: '',
                    location: '',
                    ticketBasePrice: '',
                    numberOfTickets: '',
                    threshold: '',
                    time: '',
                });
                setIsSubmitted(true);
            })

            .catch((error) => alert(error.message));
    };



    if (isSubmitted) {
        return <Navigate to="/events" replace />; // Redirect to events page
    }

    return (
        <div className="container">
            <h2 className="heading">Create Event</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Description</label>
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                        className="textarea"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label className="label">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Time</label>
                    <input
                        type="time"
                        name="time"
                        value={eventData.time}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Ticket Base Price</label>
                    <input
                        type="number"
                        name="ticketBasePrice"
                        value={eventData.ticketBasePrice}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Number of Tickets</label>
                    <input
                        type="number"
                        name="numberOfTickets"
                        value={eventData.numberOfTickets}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Threshold</label>
                    <input
                        type="number"
                        name="threshold"
                        value={eventData.threshold}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="button">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
