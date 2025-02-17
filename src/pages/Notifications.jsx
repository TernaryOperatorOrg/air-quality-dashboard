import { useState, useEffect } from 'react';
import { BellIcon, CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchNotifications();
    fetchStats();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Fetch notifications
      // Expected Response:
      // {
      //   data: [
      //     {
      //       id: string,
      //       title: string,
      //       description: string,
      //       type: "warning" | "info" | "success",
      //       time: string (ISO timestamp),
      //       read: boolean,
      //       value?: string,
      //       threshold?: string,
      //       location?: string,
      //       changes?: string[]
      //     }
      //   ]
      // }
      const response = await fetch('http://localhost:5000/api/notifications');
      const json = await response.json();
      setNotifications(json.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchStats = async () => {
    try {
      // Fetch notification stats
      // Expected Response:
      // {
      //   data: {
      //     warnings: number,
      //     unread: number,
      //     resolved: number
      //   }
      // }
      const response = await fetch('http://localhost:5000/api/notifications/stats');
      const json = await response.json();
      setStats(json.data);
    } catch (error) {
      console.error('Error fetching notification stats:', error);
    }
  }
}

export default Notifications;