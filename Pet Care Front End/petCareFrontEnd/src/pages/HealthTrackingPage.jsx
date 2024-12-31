import React, { useContext, useEffect, useState } from 'react';
import styles from './HealthTracking.module.css';
import typographyStyles from './Typography.module.css';
import NotificationPanel from '../components/healthTracking/NotificationsPanel';
import StatisticsPanel from '../components/healthTracking/StatisticsPanel';
import { AuthContext } from '../context/AuthContext';
import TokenManager from '../services/TokenManager';
import { getAccount } from '../services/UserAccountService';

const HealthTracking = () => {
  const [isNotificationsVisible, setNotificationsVisible] = useState(false);
  const unreadCount = 2; // Replace with dynamic logic if needed

  const toggleNotifications = () => {
    setNotificationsVisible((prev) => !prev);
  };

  const { claims } = useContext(AuthContext);

  const [account, setAccount] = useState(null);
  const id = TokenManager.getClaims()?.userId;
  useEffect(() => {
    const fetchAccount = async () => {
      const accountData = await getAccount(id);
      setAccount(accountData);
    };
    fetchAccount();
  }, [id]);

  if (!account) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.healthTrackingPage}>
      <h1 className={typographyStyles.title}>Health Tracking</h1>
      <div className={styles.notificationsAndStatistics}>
        <div
          className={`${styles.notificationsSection} ${isNotificationsVisible ? styles.visible : styles.partial
            }`}
        >
          <button className={styles.toggleBtn} onClick={toggleNotifications}>
            {isNotificationsVisible ? '<' : '>'}
          </button>
          {!isNotificationsVisible && (
            <span className={styles.unreadBadge}>{unreadCount}</span>
          )}
          {isNotificationsVisible && <NotificationPanel />}
        </div>

        <div
          className={`${styles.statisticsSection} ${isNotificationsVisible ? styles.shrink : ''
            }`}
        >
            {account.pets?.length > 0 ? (
              <StatisticsPanel pets={account.pets}/>
            ) : (
              <h1 className={typographyStyles.title}>You haven't added any pets.</h1>
            )}          
        </div>
      </div>
    </div>
  );
};

export default HealthTracking;
