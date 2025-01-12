import React, { useState, useEffect } from "react";
import styles from "./NotificationPanel.module.css";
import { fetchNotifications, markNotificationAsRead } from "../../services/NotificationService";
import { connectWebSocket, disconnectWebSocket } from "../../services/WebSocketService";
import TokenManager from "../../services/TokenManager";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("unread");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const { notifications, totalPages } = await fetchNotifications(filter, currentPage, PAGE_SIZE);
        setNotifications(notifications);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    };

    loadNotifications();
  }, [filter, currentPage]);

  useEffect(() => {
    const userId = TokenManager.getClaims()?.userId;

    if (!userId) return;

    const client = connectWebSocket(userId, () => {
      console.log("New notification received, refreshing...");
      loadNotifications();
    }, () => {
      loadNotifications();
    });

    return () => {
      disconnectWebSocket(client);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      const { notifications, totalPages } = await fetchNotifications(filter, currentPage, PAGE_SIZE);
      setNotifications(notifications);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.filterButtons}>
        <button
          className={filter === "unread" ? styles.active : ""}
          onClick={() => {
            setFilter("unread");
            setCurrentPage(1);
          }}
        >
          Unread
        </button>
        <button
          className={filter === "read" ? styles.active : ""}
          onClick={() => {
            setFilter("read");
            setCurrentPage(1);
          }}
        >
          Read
        </button>
      </div>

      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <h3>{notification.petName}</h3>
            <p>{notification.message}</p>
            <small>{new Date(notification.date).toLocaleDateString()}</small>
            {!notification.isRead && (
              <button onClick={() => handleMarkAsRead(notification.id)}>Mark as read</button>
            )}
          </li>
        ))}
      </ul>

      {filter === "read" && (
        <div className={styles.pagination}>
          <button disabled={currentPage === 1} onClick={handlePreviousPage}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button disabled={currentPage === totalPages} onClick={handleNextPage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
