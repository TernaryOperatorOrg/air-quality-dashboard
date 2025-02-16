import { BellIcon, CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const notifications = [
  {
    id: 1,
    title: 'High PM2.5 Levels Detected',
    description: 'Station 1 reported unusually high PM2.5 levels at 08:00. Current level: 45 µg/m³',
    type: 'warning',
    time: '2 hours ago',
    read: false,
    value: '45 µg/m³',
    threshold: '35 µg/m³',
  },
  {
    id: 2,
    title: 'Sensor Maintenance Required',
    description: 'Station 2 PM10 sensor requires calibration. Last calibration: 30 days ago',
    type: 'info',
    time: '4 hours ago',
    read: false,
    location: 'Station 2 - Industrial Zone',
  },
  {
    id: 3,
    title: 'System Update Complete',
    description: 'Air quality monitoring system has been updated to version 2.4.0',
    type: 'success',
    time: '1 day ago',
    read: true,
    changes: ['Improved sensor accuracy', 'Enhanced anomaly detection'],
  },
];

function Notifications() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-500/10 via-primary-500/5 to-transparent p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600">
              Notifications
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Stay updated with real-time alerts and system notifications
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="btn-primary bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800">
              Mark All as Read
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
              <ExclamationTriangleIcon className="h-5 w-5" />
              <span className="font-medium">Warnings</span>
            </div>
            <p className="text-2xl font-bold mt-2">3</p>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <BellIcon className="h-5 w-5" />
              <span className="font-medium">Unread</span>
            </div>
            <p className="text-2xl font-bold mt-2">5</p>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircleIcon className="h-5 w-5" />
              <span className="font-medium">Resolved</span>
            </div>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`group p-4 rounded-xl transition-all duration-200 ${
              notification.read
                ? 'bg-white dark:bg-gray-800'
                : 'bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/5'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                'bg-blue-100 dark:bg-blue-900/30'
              }`}>
                {notification.type === 'warning' && (
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                )}
                {notification.type === 'success' && (
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                )}
                {notification.type === 'info' && (
                  <BellIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{notification.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {notification.description}
                    </p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                {notification.value && (
                  <div className="mt-3 flex items-center gap-3">
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded text-sm">
                      Current: {notification.value}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-sm">
                      Threshold: {notification.threshold}
                    </span>
                  </div>
                )}
                {notification.changes && (
                  <ul className="mt-3 space-y-1">
                    {notification.changes.map((change, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        {change}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {notification.time}
                  </span>
                  {notification.location && (
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {notification.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;