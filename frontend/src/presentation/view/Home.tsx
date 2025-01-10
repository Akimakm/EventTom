import {useEffect, useState} from "react";

// Import Role Strategies
import { CustomerStrategy } from "../strategy/CustomerStrategy";
import { EventCreatorStrategy } from "../strategy/EventCreatorStrategy";
import { EventManagerStrategy } from "../strategy/EventManagerStrategy";

// RoleStrategy Interface
import { RoleStrategy } from "../strategy/RoleStrategy";
import NotificationWebSocket from "../../NotificationWebSocket";

const Home = () => {
    const role = localStorage.getItem("role");
    // State for notifications
    const [realTimeNotifications, setRealTimeNotifications] = useState<string[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);

    // Initialize WebSocket connection
    useEffect(() => {
        let client: any; // Declare the client variable

        const initializeWebSocket = () => {
            client = NotificationWebSocket((notification: any) => {
                if (notification.type === "TICKET_PURCHASE" || notification.type === "NEW_EVENT" ) {
                    setRealTimeNotifications((prev) => [notification.message, ...prev]);
                }
            });
        };
        console.log(" Before WebSocket initialized");
        initializeWebSocket(); // Initialize the WebSocket connection
        console.log("WebSocket initialized");

        // Cleanup function to deactivate the WebSocket
        return () => client.deactivate() ;

    }, []);


    if (!role) {
        return <div>Error: User role not found. Please log in.</div>;
    }


    // Method to toggle notifications
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    // Dynamically select the strategy based on the role
    const getStrategy = (): RoleStrategy => {
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

    const strategy = getStrategy(); // Get the appropriate strategy

    // Delegate all rendering to the strategy
    return strategy.renderHome({ toggleNotifications, showNotifications, notifications: realTimeNotifications });
};

export default Home;
