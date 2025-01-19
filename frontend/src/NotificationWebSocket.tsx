// NotificationWebSocket.tsx
import { Client } from "@stomp/stompjs";

const NotificationWebSocket = (onNotification: (notification: any) => void) => {
    const client = new Client({
        brokerURL: "ws://34.202.193.181:8080/ws", // Your backend WebSocket endpoint
        reconnectDelay: 5000, // Reconnect after 5 seconds
        onConnect: () => {
            console.log("Connected to WebSocket");

            // Subscribe to client notifications
            client.subscribe("/topic/clients", (message) => {
                const notification = JSON.parse(message.body);
                console.log("Notification received: ", notification);
                onNotification(notification);
            });

            // Subscribe to event manager notifications
            client.subscribe("/topic/eventManagers", (message) => {
                const notification = JSON.parse(message.body);
                onNotification(notification);
            });
        },
        debug: (str) => console.log(str),
        onStompError: (frame) => console.error("WebSocket Error: ", frame),
    });

    client.activate();

    return client;
};

export default NotificationWebSocket;
