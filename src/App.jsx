import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AnomalyDetection from './pages/AnomalyDetection';
import Comparison from './pages/Comparison';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import CarbonMarketplace from './pages/CarbonMarketplace';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} />
          <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} bg-gray-50 dark:bg-gray-900`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/anomalies" element={<AnomalyDetection />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/carbon-marketplace" element={<CarbonMarketplace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;