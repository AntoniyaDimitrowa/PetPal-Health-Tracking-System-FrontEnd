import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client'; // Import SockJS
import { baseURL } from "../config.js";
import TokenManager from "./TokenManager.jsx";

if (typeof global === 'undefined') {
    var global = window;
}

export const connectWebSocket = (userId, onNotification, onUnreadCountChange) => {
    const socketURL = `${baseURL}/ws`; // SockJS endpoint

    const client = new Client({
        webSocketFactory: () => new SockJS(socketURL), // Use SockJS for the connection
        connectHeaders: {
            Authorization: `Bearer ${TokenManager.getAccessToken()}`, // Token for authentication
        },
        debug: (str) => console.log('STOMP debug:', str), // Optional for debugging
        reconnectDelay: 5000, // Auto-reconnect delay
        heartbeatIncoming: 4000,  
        heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
        console.log("WebSocket connected.");

        // Subscribe to notifications topic
        client.subscribe(`/topic/notifications/${userId}`, (message) => {
            const data = JSON.parse(message.body);
            console.log("Received notification:", data);
            onNotification(); // Trigger the callback to update unread count
        });

        client.subscribe(`/topic/unread-count/${userId}`, (message) => {
            const newUnreadCount = JSON.parse(message.body);
            console.log("Unread count updated:", newUnreadCount);
            onUnreadCountChange(newUnreadCount); // Update unread count
        });
    };

    client.onStompError = (frame) => {
        console.error("STOMP error:", frame.headers['message']);
        console.error("Additional details:", frame.body);
    };

    client.activate(); // Connects the WebSocket

    return client; // Return client for further interactions
};


export const disconnectWebSocket = (client) => {
    if (client && client.connected) {
        client.deactivate();
        console.log("WebSocket disconnected.");
    }
};
