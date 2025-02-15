import { BellIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const notifications = [
  {
    id: 1,
    title: 'High PM2.5 Levels Detected',
    description: 'Station 1 reported unusually high PM2.5 levels at 08:00.',
    type: 'warning',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    title: 'Sensor Maintenance Required',
    description: 'Station 2 PM10 sensor requires calibration.',
    type: 'info',
    time: '4 hours ago',
    read: false,
  },
  {
    id: 3,
    title: 'System Update Complete',
    description: 'Air quality monitoring system has been updated successfully.',
    type: 'success',
    time: '1 day ago',
    read: true,
  },
];

function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <button className="btn-primary">
          Mark All as Read
        </button>
      </div>

      <div className="card">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${
                notification.read
                  ? 'bg-gray-50 dark:bg-gray-700/50'
                  : 'bg-primary-50 dark:bg-primary-900/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {notification.type === 'warning' && (
                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
                  )}
                  {notification.type === 'success' && (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  )}
                  {notification.type === 'info' && (
                    <BellIcon className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{notification.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {notification.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                  <span className="sr-only">Dismiss</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;