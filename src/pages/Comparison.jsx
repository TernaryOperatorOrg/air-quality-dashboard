import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Temporary mock data
const data = [
  { time: '00:00', station1_pm25: 12, station1_pm10: 25, station2_pm25: 14, station2_pm10: 28 },
  { time: '04:00', station1_pm25: 15, station1_pm10: 30, station2_pm25: 16, station2_pm10: 32 },
  { time: '08:00', station1_pm25: 20, station1_pm10: 40, station2_pm25: 18, station2_pm10: 36 },
  { time: '12:00', station1_pm25: 18, station1_pm10: 35, station2_pm25: 22, station2_pm10: 42 },
  { time: '16:00', station1_pm25: 22, station1_pm10: 45, station2_pm25: 20, station2_pm10: 38 },
  { time: '20:00', station1_pm25: 16, station1_pm10: 32, station2_pm25: 15, station2_pm10: 30 },
];

function Comparison() {
  const [station1, setStation1] = useState('station1');
  const [station2, setStation2] = useState('station2');
  const [parameter, setParameter] = useState('pm25');
  const [dateRange, setDateRange] = useState('24h');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Station Comparison</h2>
        <div className="flex gap-4">
          <select
            value={station1}
            onChange={(e) => setStation1(e.target.value)}
            className="input"
          >
            <option value="station1">Station 1</option>
            <option value="station2">Station 2</option>
            <option value="station3">Station 3</option>
          </select>
          <select
            value={station2}
            onChange={(e) => setStation2(e.target.value)}
            className="input"
          >
            <option value="station1">Station 1</option>
            <option value="station2">Station 2</option>
            <option value="station3">Station 3</option>
          </select>
          <select
            value={parameter}
            onChange={(e) => setParameter(e.target.value)}
            className="input"
          >
            <option value="pm25">PM2.5</option>
            <option value="pm10">PM10</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Comparison Chart</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="station1_pm25" 
                stroke="#0ea5e9" 
                name="Station 1 PM2.5"
              />
              <Line 
                type="monotone" 
                dataKey="station2_pm25" 
                stroke="#6366f1" 
                name="Station 2 PM2.5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Station 1 Summary</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Average PM2.5</dt>
              <dd className="font-semibold">17.2 µg/m³</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Max PM2.5</dt>
              <dd className="font-semibold">22.0 µg/m³</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Min PM2.5</dt>
              <dd className="font-semibold">12.0 µg/m³</dd>
            </div>
          </dl>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Station 2 Summary</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Average PM2.5</dt>
              <dd className="font-semibold">17.5 µg/m³</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Max PM2.5</dt>
              <dd className="font-semibold">22.0 µg/m³</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Min PM2.5</dt>
              <dd className="font-semibold">14.0 µg/m³</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Comparison;