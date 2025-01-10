import React from 'react';
import { RoleStrategy } from './RoleStrategy';
import logo from "../img/logo.png"
import "../styles/HomeEvent.css"
import '@fortawesome/fontawesome-free/css/all.min.css';

export class CustomerStrategy extends RoleStrategy {

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
                <p>Price per Ticket: ${eventDetails.price}</p>
                <p>Fees: ${eventDetails.fee}</p>
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

    renderHome({ toggleNotifications, showNotifications, notifications }: {toggleNotifications: () => void; showNotifications: boolean; notifications: string[]; }): React.JSX.Element {
        return (
            <div>
                {/* Header */}
                <div className="top-header-area" id="sticker">
                    <div className="container">
                        <div className="header-content">
                            {/* Logo */}
                            <div className="site-logo">
                                <a href="/home">
                                    <img className="imagelogo" src={logo} alt="EventTom" />
                                </a>
                            </div>

                            {/* Navigation */}
                            <nav className="main-menu">
                                <ul className="menu-center">
                                    <li className="current-list-item">
                                        <a href="/home">Home</a>
                                    </li>
                                    <li>
                                        <a href="/events">Event</a>
                                    </li>
                                </ul>
                            </nav>

                            {/* Icons */}
                            <div className="header-icons">
                                <a className="mobile-hide notification-icon" >
                                <div
                                    className="notification-wrapper"
                                    onClick={toggleNotifications}
                                >
                                    <i className="fas fa-bell"></i>
                                    {showNotifications && (
                                        <div className="notification-dropdown">
                                            <ul>
                                                {notifications.map((notif: string, index: number) => (
                                                    <li key={index}>{notif}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="hero-area hero-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 offset-lg-2 text-center">
                                <div className="hero-text">
                                    <h1>Welcome to the Customer Home Page</h1>
                                    <h2>Explore events and buy tickets with available discounts.</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
