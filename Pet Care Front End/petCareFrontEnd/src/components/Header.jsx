import React, { useContext, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TokenManager from "../services/TokenManager";
import { fetchUnreadCount } from "../services/NotificationService";
import { connectWebSocket, disconnectWebSocket } from "../services/WebSocketService";

function Header() {
  const { claims, signOut } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!claims) return;

    const userId = TokenManager.getClaims()?.userId;

    const fetchUnreadNotifications = async () => {
      const count = await fetchUnreadCount(userId);
      setUnreadCount(count);
    };

    fetchUnreadNotifications();

    
    // Connect to WebSocket and update unread count when a new notification is received
    const socket = connectWebSocket(userId, () => {
      setUnreadCount((prev) => prev + 1); // Increment unread count
    }, () => {
      setUnreadCount((prev) => prev - 1); // Decrease unread count
    });

    // Cleanup on unmount
    return () => {
      disconnectWebSocket(socket);
    };
  }, [claims]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/assets/logo-with-text.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>
              Home
            </NavLink>
          </li>
          {claims?.roles.includes("Admin") ? (
            <>
              <li>
                <NavLink
                  to="/breeds"
                  className={({ isActive }) => (isActive ? styles.active : undefined)}
                >
                  Breeds
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/moods"
                  className={({ isActive }) => (isActive ? styles.active : undefined)}
                >
                  Moods
                </NavLink>
              </li>
            </>
          ) : claims ? (
            <>
              <li>
                <a href="#socialize"></a>
                <NavLink
                    to="/futureFeature"
                    className={({ isActive }) => (isActive ? styles.active : undefined)}
                  >
                    Socialize <span>({unreadCount})</span>
                  </NavLink>
              </li>
              {claims.roles.includes("Owner") && (
                <li>
                  <NavLink
                    to="/healthTracking"
                    className={({ isActive }) => (isActive ? styles.active : undefined)}
                  >
                    Health Tracking <span>({unreadCount})</span>
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/account"
                  className={({ isActive }) => (isActive ? styles.active : undefined)}
                >
                  Account
                </NavLink>
              </li>
            </>
          ) : null}
        </ul>
      </nav>

      {claims ? (
        <div className={styles.authButtons}>
          <Link to="/login">
            <button className={styles.btnPrimary} onClick={signOut}>
              Log Out
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <Link to="/login">
            <button className={styles.btnSecondary}>Log In</button>
          </Link>
          <Link to="/signup">
            <button className={styles.btnPrimary}>Sign Up</button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
