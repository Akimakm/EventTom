import React, { useState } from 'react';
import { RoleStrategy } from './RoleStrategy';

const CustomerStrategy = ({ eventDetails }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedDiscount, setSelectedDiscount] = useState(eventDetails.discounts[0]?.id || null);

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleDiscountChange = (e) => {
        setSelectedDiscount(Number(e.target.value));
    };

    const calculateTotalPrice = () => {
        const basePrice = eventDetails.price;
        const taxRate = 0.1; // Assuming a 10% tax rate
        const discount = eventDetails.discounts.find(discount => discount.id === selectedDiscount)?.discount || 0;
        const priceAfterDiscount = basePrice * (1 - discount / 100);
        const totalPrice = priceAfterDiscount * quantity * (1 + taxRate);
        return totalPrice.toFixed(2);
    };

    return (
        <div>
            <h2>{eventDetails.title}</h2>
            <p>{eventDetails.description}</p>
            <p>Date: {eventDetails.date}</p>
            <p>Location: {eventDetails.location}</p>
            <p>Price: ${eventDetails.price}</p>
            <p>Tickets Available: {eventDetails.ticketsAvailable}</p>
            <div>
                <h3>Buy Tickets</h3>
                <input
                    type="number"
                    placeholder="Quantity"
                    min="1"
                    max={eventDetails.ticketsAvailable}
                    value={quantity}
                    onChange={handleQuantityChange}
                />
                <select value={selectedDiscount} onChange={handleDiscountChange}>
                    {eventDetails.discounts.map((discount, index) => (
                        <option key={index} value={discount.id}>
                            {discount.code} - {discount.discount}%
                        </option>
                    ))}
                </select>
                <p>Total Price: ${calculateTotalPrice()}</p>
                <button>Buy Tickets</button>
            </div>
        </div>
    );
};

export default CustomerStrategy;