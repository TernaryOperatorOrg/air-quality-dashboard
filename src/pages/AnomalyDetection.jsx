import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import LocationSearch from '../components/LocationSearch';
import DateRangePicker from '../components/DateRangePicker';

// Temporary mock data
const anomalyData = [
  { time: '00:00', pm25: 12, pm10: 25, isAnomaly: false },
  { time: '04:00', pm25: 15, pm10: 30, isAnomaly: false },
  { time: '08:00', pm25: 45, pm10: 80, isAnomaly: true },
  { time: '12:00', pm25: 18, pm10: 35, isAnomaly: false },
  { time: '16:00', pm25: 52, pm10: 95, isAnomaly: true },
  { time: '20:00', pm25: 16, pm10: 32, isAnomaly: false },
];

function AnomalyDetection() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold">Anomaly Detection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto">
          <LocationSearch
            value={selectedLocation}
            onChange={setSelectedLocation}
            className="w-full md:w-64"
          />
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="input"
          >
            <option value="all">All Severities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <DateRangePicker onChange={setDateRange} />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Anomaly Timeline</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={anomalyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pm25" stroke="#0ea5e9" name="PM2.5" />
              <Line type="monotone" dataKey="pm10" stroke="#6366f1" name="PM10" />
              {anomalyData.map((entry, index) => 
                entry.isAnomaly && (
                  <ReferenceDot
                    key={index}
                    x={entry.time}
                    y={entry.pm25}
                    r={4}
                    fill="#ef4444"
                    stroke="none"
                  />
                )
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Anomaly List</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedLocation ? selectedLocation.label : 'All Locations'} •{' '}
              {dateRange[0] && dateRange[1]
                ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
                : 'All Time'}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Parameter</th>
                <th className="py-3 px-4 text-left">Value</th>
                <th className="py-3 px-4 text-left">Severity</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3 px-4">08:00</td>
                <td className="py-3 px-4">Station 1 - Downtown</td>
                <td className="py-3 px-4">PM2.5</td>
                <td className="py-3 px-4">45 µg/m³</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-sm">
                    High
                  </span>
                </td>
                <td className="py-3 px-4">Investigating</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3 px-4">16:00</td>
                <td className="py-3 px-4">Station 2 - Industrial</td>
                <td className="py-3 px-4">PM10</td>
                <td className="py-3 px-4">95 µg/m³</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-sm">
                    High
                  </span>
                </td>
                <td className="py-3 px-4">Resolved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnomalyDetection;