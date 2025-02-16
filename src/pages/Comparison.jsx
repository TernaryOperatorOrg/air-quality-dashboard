import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import LocationSearch from '../components/LocationSearch';
import DateRangePicker from '../components/DateRangePicker';

// Enhanced mock data
const timeSeriesData = [
  { time: '00:00', station1_pm25: 12, station1_pm10: 25, station2_pm25: 14, station2_pm10: 28 },
  { time: '04:00', station1_pm25: 15, station1_pm10: 30, station2_pm25: 16, station2_pm10: 32 },
  { time: '08:00', station1_pm25: 20, station1_pm10: 40, station2_pm25: 18, station2_pm10: 36 },
  { time: '12:00', station1_pm25: 18, station1_pm10: 35, station2_pm25: 22, station2_pm10: 42 },
  { time: '16:00', station1_pm25: 22, station1_pm10: 45, station2_pm25: 20, station2_pm10: 38 },
  { time: '20:00', station1_pm25: 16, station1_pm10: 32, station2_pm25: 15, station2_pm10: 30 },
];

const differenceData = timeSeriesData.map(entry => ({
  time: entry.time,
  pm25_diff: Math.abs(entry.station1_pm25 - entry.station2_pm25),
  pm10_diff: Math.abs(entry.station1_pm10 - entry.station2_pm10),
}));

function Comparison() {
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [parameter, setParameter] = useState('pm25');
  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Station Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:w-auto">
          <LocationSearch
            value={location1}
            onChange={setLocation1}
            className="w-full md:w-64"
          />
          <LocationSearch
            value={location2}
            onChange={setLocation2}
            className="w-full md:w-64"
          />
          <select
            value={parameter}
            onChange={(e) => setParameter(e.target.value)}
            className="input"
          >
            <option value="pm25">PM2.5</option>
            <option value="pm10">PM10</option>
          </select>
          <DateRangePicker onChange={setDateRange} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Time Series Comparison</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="station1_pm25" 
                  stroke="#0090ff" 
                  fill="#0090ff" 
                  fillOpacity={0.2} 
                  name={location1 ? location1.label : "Station 1"}
                />
                <Area 
                  type="monotone" 
                  dataKey="station2_pm25" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.2} 
                  name={location2 ? location2.label : "Station 2"}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Difference Analysis</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={differenceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="pm25_diff" 
                  fill="#0090ff" 
                  name="PM2.5 Difference"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="pm10_diff" 
                  fill="#10b981" 
                  name="PM10 Difference"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/50 dark:to-primary-800/50">
          <h3 className="text-lg font-semibold mb-4 text-primary-900 dark:text-primary-100">
            {location1 ? location1.label : "Station 1"} Summary
          </h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-primary-700 dark:text-primary-300">Average PM2.5</dt>
              <dd className="font-semibold text-primary-900 dark:text-primary-100">17.2 µg/m³</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-primary-700 dark:text-primary-300">Max PM2.5</dt>
              <dd className="font-semibold text-primary-900 dark:text-primary-100">22.0 µg/m³</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-primary-700 dark:text-primary-300">Min PM2.5</dt>
              <dd className="font-semibold text-primary-900 dark:text-primary-100">12.0 µg/m³</dd>
            </div>
          </dl>
        </div>
        
        <div className="card bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/50 dark:to-success-800/50">
          <h3 className="text-lg font-semibold mb-4 text-success-900 dark:text-success-100">
            {location2 ? location2.label : "Station 2"} Summary
          </h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-success-700 dark:text-success-300">Average PM2.5</dt>
              <dd className="font-semibold text-success-900 dark:text-success-100">17.5 µg/m³</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-success-700 dark:text-success-300">Max PM2.5</dt>
              <dd className="font-semibold text-success-900 dark:text-success-100">22.0 µg/m³</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-success-700 dark:text-success-300">Min PM2.5</dt>
              <dd className="font-semibold text-success-900 dark:text-success-100">14.0 µg/m³</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Comparison;