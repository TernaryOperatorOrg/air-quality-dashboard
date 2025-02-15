import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Temporary mock data
const data = [
  { time: '00:00', pm25: 12, pm10: 25 },
  { time: '04:00', pm25: 15, pm10: 30 },
  { time: '08:00', pm25: 20, pm10: 40 },
  { time: '12:00', pm25: 18, pm10: 35 },
  { time: '16:00', pm25: 22, pm10: 45 },
  { time: '20:00', pm25: 16, pm10: 32 },
];

function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Air Quality Dashboard</h2>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="input"
        >
          <option value="all">All Locations</option>
          <option value="station1">Station 1</option>
          <option value="station2">Station 2</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">PM2.5</h3>
          <p className="text-3xl font-bold text-primary-600">18 µg/m³</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Level</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">PM10</h3>
          <p className="text-3xl font-bold text-primary-600">35 µg/m³</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Level</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Anomalies</h3>
          <p className="text-3xl font-bold text-red-600">3</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last 24 hours</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Sensor Status</h3>
          <p className="text-3xl font-bold text-green-600">98%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Operational</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Air Quality Trends</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pm25" stroke="#0ea5e9" name="PM2.5" />
              <Line type="monotone" dataKey="pm10" stroke="#6366f1" name="PM10" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;