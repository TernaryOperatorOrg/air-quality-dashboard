import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ExclamationTriangleIcon,
  ArrowsRightLeftIcon,
  DocumentTextIcon,
  BellIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, path: '/' },
  { name: 'Anomalies', icon: ExclamationTriangleIcon, path: '/anomalies' },
  { name: 'Comparison', icon: ArrowsRightLeftIcon, path: '/comparison' },
  { name: 'Reports', icon: DocumentTextIcon, path: '/reports' },
  { name: 'Notifications', icon: BellIcon, path: '/notifications' },
  { name: 'Carbon Marketplace', icon: CurrencyDollarIcon, path: '/carbon-marketplace' },
];

function Sidebar({ isOpen }) {
  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-md transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;