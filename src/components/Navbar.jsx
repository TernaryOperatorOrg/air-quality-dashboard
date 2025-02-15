import { useState } from 'react';
import { Bars3Icon, BellIcon, SunIcon, MoonIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Popover } from '@headlessui/react';

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

function Navbar({ darkMode, toggleDarkMode, toggleSidebar }) {
  const [unreadCount] = useState(2);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
              Air Quality Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
            
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative focus:outline-none">
                    <BellIcon className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                  </Popover.Button>

                  {open && (
                    <Popover.Panel className="absolute right-0 mt-2 w-96 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">Notifications</h3>
                          <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
                            Mark all as read
                          </button>
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg ${
                                notification.read
                                  ? 'bg-gray-50 dark:bg-gray-700/50'
                                  : 'bg-primary-50 dark:bg-primary-900/20'
                              }`}
                            >
                              <div className="flex gap-3">
                                <div className="flex-shrink-0">
                                  {notification.type === 'warning' && (
                                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                                  )}
                                  {notification.type === 'success' && (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                  )}
                                  {notification.type === 'info' && (
                                    <BellIcon className="h-5 w-5 text-blue-500" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium">
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {notification.description}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-center">
                          <a
                            href="/notifications"
                            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                          >
                            View all notifications
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  )}
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;