import React, { useState, useEffect } from 'react';
import { CustomerStrategy } from '../strategy/CustomerStrategy';
import { EventCreatorStrategy } from '../strategy/EventCreatorStrategy';
import { EventManagerStrategy } from '../strategy/EventManagerStrategy';
import NotificationWebSocket from "../../NotificationWebSocket";
import {RoleStrategy} from "../strategy/RoleStrategy";
//import NotificationWebSocket from '../../NotificationWebSocket';

export const EventDetailsPage = ({ role, eventDetails }: { role: string; eventDetails: any }) => {
    const [currentEventDetails, setEventDetails] = useState(eventDetails); // Keep track of event details
    const [quantity, setQuantity] = useState(1);
    const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [totalPrice, setTotalPrice] = useState(eventDetails.price);

    // Update total price dynamically whenever quantity or voucher changes
    useEffect(() => {
        const basePrice = currentEventDetails.price * quantity + currentEventDetails.fee;
        if (selectedVoucher !== null) {
            const discount = currentEventDetails.discounts.find(
                (discount: any) => discount.id === selectedVoucher
            )?.discount || 0;
            const discountedPrice = basePrice * (1 - discount / 100);
            setTotalPrice(discountedPrice);
        } else {
            setTotalPrice(basePrice);
        }
    }, [quantity, selectedVoucher, currentEventDetails]);

    useEffect(() => {
        let client: any;

        const initializeWebSocket = () => {
            client = NotificationWebSocket((notification: any) => {
                if (notification.type === "EVENT_UPDATE") {
                    console.log("Event update notification received:", notification);

                    // Check if the notification matches the current event
                    if (notification.event.id === currentEventDetails.id) {
                        setEventDetails((prevDetails: any) => ({
                            ...prevDetails,
                            ticketsSold: notification.ticketsSold,
                            ticketsAvailable: notification.event.numberOfTickets,
                        }));
                    }
                }
            });
        };
        initializeWebSocket(); // Initialize the WebSocket connection
        console.log("WebSocket initialized");

        // Cleanup function to deactivate the WebSocket
        return () => client.deactivate() ;

    }, [currentEventDetails.id]);


    // Handle quantity change
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(Number(e.target.value), currentEventDetails.ticketsAvailable));
        setQuantity(value);
    };

    // Handle voucher change
    const handleVoucherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedVoucher(Number(e.target.value));
    };

    // Handle ticket purchase
    const handlePurchase = () => {
        const clientId = localStorage.getItem('id'); // Retrieve client ID from local storage

        fetch(`http://44.208.179.224:8080/api/tickets/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: currentEventDetails.id,
                quantity,
                voucherId: selectedVoucher,
                clientId,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.message);
                    });
                }
                return response.json();
            })
            .then((data) => {
                setMessage(data.message); // Display success message
                setEventDetails((prevDetails:any) => ({
                    ...prevDetails,
                    ticketsAvailable: prevDetails.ticketsAvailable - quantity,
                })); // Update tickets available
            })
            .catch((error) => {
                setMessage(error.message); // Display error message
            });
    };

    // Dynamically determine the appropriate strategy
    const getStrategy = (role:any): RoleStrategy => {
        switch (role.toLowerCase()) {
            case "customer":
                return new CustomerStrategy();
            case "eventcreator":
                return new EventCreatorStrategy();
            case "eventmanager":
                return new EventManagerStrategy();
            default:
                throw new Error("Unknown role");
        }
    };

    const strategy = getStrategy(role);

    // Delegate rendering to the strategy, passing updated event details
    return strategy.renderDetails(
        currentEventDetails,
        { quantity, selectedVoucher, message, totalPrice },
        { handleQuantityChange, handleVoucherChange, handlePurchase }
    );
};
