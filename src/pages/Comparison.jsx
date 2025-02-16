import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LocationSearch from '../components/LocationSearch';
import DateRangePicker from '../components/DateRangePicker';

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
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [parameter, setParameter] = useState('pm25');
  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold">Station Comparison</h2>
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

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Comparison Chart</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {dateRange[0] && dateRange[1]
              ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
              : 'All Time'}
          </div>
        </div>
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
                name={location1 ? location1.label : "Station 1"}
              />
              <Line 
                type="monotone" 
                dataKey="station2_pm25" 
                stroke="#6366f1" 
                name={location2 ? location2.label : "Station 2"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">
            {location1 ? location1.label : "Station 1"} Summary
          </h3>
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
          <h3 className="text-lg font-semibold mb-4">
            {location2 ? location2.label : "Station 2"} Summary
          </h3>
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