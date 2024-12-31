import React from 'react';
import styles from './NotificationPanel.module.css';

const NotificationPanel = () => {
  const notifications = [
    { pet: 'Buddy', message: "Buddy's health is on track!", date: '30/12/24', id: 1 },
    { pet: 'Lili', message: "Lili is not eating enough!", date: '30/12/24', id: 2 },
  ];

  return (
    <div className={styles.notificationsContainer}>
      <h2>Read / Unread</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <h3>{notification.pet}</h3>
            <p>{notification.message}</p>
            <small>{notification.date}</small>
            <div className={styles.notificationActions}>
              <button>Mark as read</button>
              {notification.message.includes('not eating') && <button>See more</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
