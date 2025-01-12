import React, { useContext, useEffect, useState } from "react";
import styles from "./HealthTracking.module.css";
import typographyStyles from "./Typography.module.css";
import NotificationPanel from "../components/healthTracking/NotificationsPanel";
import StatisticsPanel from "../components/healthTracking/StatisticsPanel";
import { AuthContext } from "../context/AuthContext";
import TokenManager from "../services/TokenManager";
import { getAccount } from "../services/UserAccountService";
import { connectWebSocket, disconnectWebSocket } from "../services/WebSocketService";
import { fetchUnreadCount } from "../services/NotificationService";

const HealthTracking = () => {
  const [isNotificationsVisible, setNotificationsVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [account, setAccount] = useState(null);

  const toggleNotifications = () => {
    setNotificationsVisible((prev) => !prev);
  };

  const userId = TokenManager.getClaims()?.userId;

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const accountData = await getAccount(userId);
        setAccount(accountData);
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      }
    };

    const fetchUnreadNotifications = async () => {
      try {
        const count = await fetchUnreadCount(userId);
        setUnreadCount(count);
      } catch (error) {
        console.error("Failed to fetch unread notifications:", error);
      }
    };

    fetchAccountData();
    fetchUnreadNotifications();

    const client = connectWebSocket(userId, () => {
      setUnreadCount((prev) => prev + 1); // Increment unread count
    }, () => {
      setUnreadCount((prev) => prev - 1); // Decrease unread count
    });

    return () => {
      disconnectWebSocket(client);
    };
  }, [userId]);

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.healthTrackingPage}>
      <h1 className={typographyStyles.title}>Health Tracking</h1>
      <div className={styles.notificationsAndStatistics}>
        <div
          className={`${styles.notificationsSection} ${isNotificationsVisible ? styles.visible : styles.partial}`}
        >
          <button className={styles.toggleBtn} onClick={toggleNotifications}>
            {isNotificationsVisible ? "<" : ">"}
          </button>
          {!isNotificationsVisible && (
            <span className={styles.unreadBadge}>{unreadCount}</span>
          )}
          {isNotificationsVisible && <NotificationPanel />}
        </div>

        <div
          className={`${styles.statisticsSection} ${isNotificationsVisible ? styles.shrink : ""}`}
        >
          {account.pets?.length > 0 ? (
            <StatisticsPanel pets={account.pets} />
          ) : (
            <h1 className={typographyStyles.title}>You haven't added any pets.</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthTracking;
