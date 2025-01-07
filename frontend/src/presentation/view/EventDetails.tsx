import React, { useState, useEffect } from 'react';
import { CustomerStrategy } from '../strategy/CustomerStrategy';
import { EventCreatorStrategy } from '../strategy/EventCreatorStrategy';
import { EventManagerStrategy } from '../strategy/EventManagerStrategy';

export const EventDetailsPage = ({ role, eventDetails }: { role: string; eventDetails: any }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [totalPrice, setTotalPrice] = useState(eventDetails.price);

    // Update total price dynamically whenever quantity or voucher changes
    useEffect(() => {
        const basePrice = eventDetails.price * quantity;
        if (selectedVoucher !== null) {
            const discount = eventDetails.discounts.find(
                (discount: any) => discount.id === selectedVoucher
            )?.discount || 0;
            const discountedPrice = basePrice * (1 - discount / 100);
            setTotalPrice(discountedPrice);
        } else {
            setTotalPrice(basePrice);
        }
    }, [quantity, selectedVoucher, eventDetails.price, eventDetails.discounts]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(Number(e.target.value), eventDetails.ticketsAvailable));
        setQuantity(value);
    };

    const handleVoucherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedVoucher(Number(e.target.value));
    };

    const handlePurchase = () => {
        const clientId = localStorage.getItem('id'); // Retrieve client ID from local storage

        fetch(`http://localhost:8080/api/tickets/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: eventDetails.id,
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
                eventDetails.ticketsAvailable -= quantity; // Update tickets available
            })
            .catch((error) => {
                setMessage(error.message); // Display error message
            });
    };

    const getStrategy = (role: string) => {
        switch (role.toLowerCase()) {
            case 'customer':
                return new CustomerStrategy();
            case 'eventcreator':
                return new EventCreatorStrategy();
            case 'eventmanager':
                return new EventManagerStrategy();
            default:
                throw new Error('Unknown role');
        }
    };

    const strategy = getStrategy(role);

    return strategy.renderDetails(
        eventDetails,
        { quantity, selectedVoucher, message, totalPrice },
        { handleQuantityChange, handleVoucherChange, handlePurchase }
    );
};
