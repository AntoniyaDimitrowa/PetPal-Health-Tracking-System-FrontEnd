import axios from "axios";
import { baseURL } from "../config.js";
import TokenManager from "./TokenManager.jsx";

export const fetchNotifications = async (filter, page, pageSize) => {
  try {
    const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
    if (!token) {
      throw new Error("Token is missing");
    }

    const userId = TokenManager.getClaims()?.userId;

    const response = await axios.get(`${baseURL}/notifications/users/${userId}`, {
      params: {
        status: filter,
        page,
        size: pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.data) {
      console.log("Notifications fetched successfully:", response.data);
      return {
        notifications: response.data.content,
        totalPages: response.data.totalPages,
      };
    } else {
      console.error("No response data found.");
      throw new Error("No response data found.");
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error; // Let the caller handle the error
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
    if (!token) {
      throw new Error("Token is missing");
    }

    const response = await axios.post(
      `${baseURL}/notifications/${notificationId}/mark-as-read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Notification marked as read successfully");
      return true;
    } else {
      console.error("Failed to mark notification as read.");
      throw new Error("Failed to mark notification as read.");
    }
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

// Fetch the count of unread notifications for a user
export const fetchUnreadCount = async (userId) => {
  try {
    const token = TokenManager.getAccessToken();
    if (!token) throw new Error("Token is missing");

    const response = await axios.get(`${baseURL}/notifications/unread-count`, {
      params: { userId },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response?.data !== undefined) {
      console.log("Unread count fetched successfully:", response.data);
      return response.data; // Assuming response.data contains the count
    } else {
      throw new Error("No response data found.");
    }
  } catch (error) {
    console.error("Error fetching unread count:", error);
    throw error;
  }
};
