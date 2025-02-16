import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import LocationSearch from '../components/LocationSearch';

function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [timeOfDayData, setTimeOfDayData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedLocation]);

  const fetchDashboardData = async () => {
    try {
      // Fetch current readings
      // Expected Response:
      // {
      //   data: {
      //     pm25: number,
      //     pm10: number,
      //     anomalies_24h: number,
      //     sensor_status: number
      //   }
      // }
      const currentResponse = await fetch(`http://localhost:5000/api/dashboard/current?location_id=${selectedLocation?.value || ''}`);
      const currentJson = await currentResponse.json();
      setCurrentData(currentJson.data);

      // Fetch time series data
      // Expected Response:
      // {
      //   data: [
      //     {
      //       time: string (ISO timestamp),
      //       pm25: number,
      //       pm10: number
      //     }
      //   ]
      // }
      const timeSeriesResponse = await fetch(`http://localhost:5000/api/dashboard/timeseries?location_id=${selectedLocation?.value || ''}`);
      const timeSeriesJson = await timeSeriesResponse.json();
      setTimeSeriesData(timeSeriesJson.data);

      // Fetch 24-hour comparison data
      // Expected Response:
      // {
      //   data: [
      //     {
      //       time: string (ISO timestamp),
      //       pm25: number,
      //       pm10: number
      //     }
      //   ]
      // }
      const comparisonResponse = await fetch(`http://localhost:5000/api/dashboard/comparison?location_id=${selectedLocation?.value || ''}`);
      const comparisonJson = await comparisonResponse.json();
      setComparisonData(comparisonJson.data);

      // Fetch hourly distribution data
      // Expected Response:
      // {
      //   data: [
      //     {
      //       time: string (format: "HH:00"),
      //       pm25: number,
      //       pm10: number
      //     }
      //   ]
      // }
      const distributionResponse = await fetch(`http://localhost:5000/api/dashboard/distribution?location_id=${selectedLocation?.value || ''}`);
      const distributionJson = await distributionResponse.json();
      setDistributionData(distributionJson.data);

      // Fetch time of day analysis data
      // Expected Response:
      // {
      //   data: [
      //     {
      //       metric: string ("Morning" | "Noon" | "Evening" | "Night"),
      //       pm25: number,
      //       pm10: number
      //     }
      //   ]
      // }
      const timeOfDayResponse = await fetch(`http://localhost:5000/api/dashboard/timeofday?location_id=${selectedLocation?.value || ''}`);
      const timeOfDayJson = await timeOfDayResponse.json();
      setTimeOfDayData(timeOfDayJson.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Handle error state here
    }
  };

  if (!currentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Air Quality Dashboard</h2>
        <LocationSearch
          value={selectedLocation}
          onChange={setSelectedLocation}
          className="w-full md:w-64"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/50 dark:to-primary-800/50">
          <h3 className="text-lg font-semibold mb-2 text-primary-900 dark:text-primary-100">PM2.5</h3>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{currentData.pm25} µg/m³</p>
          <p className="text-sm text-primary-700 dark:text-primary-300">Current Level</p>
        </div>
        <div className="card bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/50 dark:to-success-800/50">
          <h3 className="text-lg font-semibold mb-2 text-success-900 dark:text-success-100">PM10</h3>
          <p className="text-3xl font-bold text-success-600 dark:text-success-400">{currentData.pm10} µg/m³</p>
          <p className="text-sm text-success-700 dark:text-success-300">Current Level</p>
        </div>
        <div className="card bg-gradient-to-br from-danger-50 to-danger-100 dark:from-danger-900/50 dark:to-danger-800/50">
          <h3 className="text-lg font-semibold mb-2 text-danger-900 dark:text-danger-100">Anomalies</h3>
          <p className="text-3xl font-bold text-danger-600 dark:text-danger-400">{currentData.anomalies_24h}</p>
          <p className="text-sm text-danger-700 dark:text-danger-300">Last 24 hours</p>
        </div>
        <div className="card bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/50 dark:to-success-800/50">
          <h3 className="text-lg font-semibold mb-2 text-success-900 dark:text-success-100">Sensor Status</h3>
          <p className="text-3xl font-bold text-success-600 dark:text-success-400">{currentData.sensor_status}%</p>
          <p className="text-sm text-success-700 dark:text-success-300">Operational</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Air Quality Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280"
                  tickFormatter={(time) => new Date(time).toLocaleTimeString()} 
                />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  labelFormatter={(time) => new Date(time).toLocaleString()}
                />
                <Area 
                  type="monotone" 
                  dataKey="pm25" 
                  stroke="#0090ff" 
                  fill="#0090ff" 
                  fillOpacity={0.2} 
                  name="PM2.5"
                />
                <Area 
                  type="monotone" 
                  dataKey="pm10" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.2} 
                  name="PM10"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">24-Hour Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280"
                  tickFormatter={(time) => new Date(time).toLocaleTimeString()} 
                />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  labelFormatter={(time) => new Date(time).toLocaleString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="pm25" 
                  stroke="#0090ff" 
                  strokeWidth={2}
                  dot={{ fill: '#0090ff', strokeWidth: 2 }}
                  name="PM2.5" 
                />
                <Line 
                  type="monotone" 
                  dataKey="pm10" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2 }}
                  name="PM10" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Hourly Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
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
                <Bar 
                  dataKey="pm25" 
                  fill="#0090ff" 
                  name="PM2.5"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="pm10" 
                  fill="#10b981" 
                  name="PM10"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Time of Day Analysis</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={timeOfDayData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                <PolarRadiusAxis stroke="#6b7280" />
                <Radar 
                  name="PM2.5" 
                  dataKey="pm25" 
                  stroke="#0090ff" 
                  fill="#0090ff" 
                  fillOpacity={0.3}
                />
                <Radar 
                  name="PM10" 
                  dataKey="pm10" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;