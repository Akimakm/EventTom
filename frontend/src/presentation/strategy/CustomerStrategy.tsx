import React from 'react';
import { RoleStrategy } from './RoleStrategy';

export class CustomerStrategy extends RoleStrategy {
    // @ts-ignore
    renderDetails(eventDetails: any, state: any, handlers: any): React.JSX.Element {
        const { quantity, selectedVoucher, message, totalPrice } = state;
        const { handleQuantityChange, handleVoucherChange, handlePurchase } = handlers;

        return (
            <div>
                <h2>{eventDetails.title}</h2>
                <p>{eventDetails.description}</p>
                <p>Date: {eventDetails.date}</p>
                <p>Time: {eventDetails.time}</p>
                <p>Location: {eventDetails.location}</p>
                <p>Price per Ticket: ${eventDetails.price.toFixed(2)}</p>
                <p>Tickets Available: {eventDetails.ticketsAvailable}</p>
                <div>
                    <h3>Buy Tickets</h3>
                    <label>
                        Number of Tickets:
                        <input
                            type="number"
                            min="1"
                            max={eventDetails.ticketsAvailable}
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </label>
                    <br />
                    <label>
                        Apply Voucher:
                        <select value={selectedVoucher || ''} onChange={handleVoucherChange}>
                            <option value="">No Voucher</option>
                            {eventDetails.discounts.map((discount: any) => (
                                <option key={discount.id} value={discount.id}>
                                    {discount.code} - {discount.discount}%
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
                    <button onClick={handlePurchase}>Buy Tickets</button>
                    {message && <p>{message}</p>}
                </div>
            </div>
        );
    }

    renderHome(): React.JSX.Element {
        return (
            <div>
                <h1>Welcome to the Customer Home Page</h1>
                {/* Add any other customer-specific home content here */}
            </div>
        );
    }
}
