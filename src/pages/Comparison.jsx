import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import LocationSearch from '../components/LocationSearch';
import DateRangePicker from '../components/DateRangePicker';

function Comparison() {
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [parameter, setParameter] = useState('pm25');
  const [dateRange, setDateRange] = useState([null, null]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [differenceData, setDifferenceData] = useState([]);
  const [summaryData, setSummaryData] = useState({ station1: null, station2: null });

  useEffect(() => {
    if (location1 && location2 && dateRange[0] && dateRange[1]) {
      fetchComparisonData();
    }
  }, [location1, location2, parameter, dateRange]);

  const fetchComparisonData = async () => {
    try {
      const params = new URLSearchParams({
        location1_id: location1.value,
        location2_id: location2.value,
        parameter,
        start_date: dateRange[0].toISOString(),
        end_date: dateRange[1].toISOString()
      });

      // Fetch time series comparison data
      // Expected Response:
      // {
      //   data: [
      //     {
      //       time: string (ISO timestamp),
      //       station1_pm25: number,
      //       station1_pm10: number,
      //       station2_pm25: number,
      //       station2_pm10: number
      //     }
      //   ]
      // }
      const timeSeriesResponse = await fetch(`http://localhost:5000/api/comparison/timeseries?${params}`);
      const timeSeriesJson = await timeSeriesResponse.json();
      setTimeSeriesData(timeSeriesJson.data);

      // Fetch difference analysis data
      // Expected Response:
      // {
      //   data: [
      //     {
      //       time: string (ISO timestamp),
      //       pm25_diff: number,
      //       pm10_diff: number
      //     }
      //   ]
      // }
      const differenceResponse = await fetch(`http://localhost:5000/api/comparison/difference?${params}`);
      const differenceJson = await differenceResponse.json();
      setDifferenceData(differenceJson.data);

      // Fetch summary data for both stations
      // Expected Response:
      // {
      //   data: {
      //     station1: {
      //       avg_pm25: number,
      //       max_pm25: number,
      //       min_pm25: number
      //     },
      //     station2: {
      //       avg_pm25: number,
      //       max_pm25: number,
      //       min_pm25: number
      //     }
      //   }
      // }
      const summaryResponse = await fetch(`http://localhost:5000/api/comparison/summary?${params}`);
      const summaryJson = await summaryResponse.json();
      setSummaryData(summaryJson.data);
    } catch (error) {
      console.error('Error fetching comparison data:', error);
      // Handle error state here
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Station Comparison</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <LocationSearch
            value={location1}
            onChange={setLocation1}
            className="w-full"
          />
          <LocationSearch
            value={location2}
            onChange={setLocation2}
            className="w-full"
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
          <div className="h-[300px] sm:h-[400px]">
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
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey={`station1_${parameter}`}
                  stroke="#0090ff" 
                  fill="#0090ff" 
                  fillOpacity={0.2} 
                  name={location1 ? location1.label : "Station 1"}
                />
                <Area 
                  type="monotone" 
                  dataKey={`station2_${parameter}`}
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
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={differenceData}>
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
                <Legend />
                <Bar 
                  dataKey={`${parameter}_diff`}
                  fill="#0090ff" 
                  name={`${parameter.toUpperCase()} Difference`}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaryData.station1 && (
          <div className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/50 dark:to-primary-800/50">
            <h3 className="text-lg font-semibold mb-4 text-primary-900 dark:text-primary-100">
              {location1 ? location1.label : "Station 1"} Summary
            </h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-primary-700 dark:text-primary-300">Average {parameter.toUpperCase()}</dt>
                <dd className="font-semibold text-primary-900 dark:text-primary-100">
                  {summaryData.station1[`avg_${parameter}`]} µg/m³
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-primary-700 dark:text-primary-300">Max {parameter.toUpperCase()}</dt>
                <dd className="font-semibold text-primary-900 dark:text-primary-100">
                  {summaryData.station1[`max_${parameter}`]} µg/m³
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-primary-700 dark:text-primary-300">Min {parameter.toUpperCase()}</dt>
                <dd className="font-semibold text-primary-900 dark:text-primary-100">
                  {summaryData.station1[`min_${parameter}`]} µg/m³
                </dd>
              </div>
            </dl>
          </div>
        )}
        
        {summaryData.station2 && (
          <div className="card bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/50 dark:to-success-800/50">
            <h3 className="text-lg font-semibold mb-4 text-success-900 dark:text-success-100">
              {location2 ? location2.label : "Station 2"} Summary
            </h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-success-700 dark:text-success-300">Average {parameter.toUpperCase()}</dt>
                <dd className="font-semibold text-success-900 dark:text-success-100">
                  {summaryData.station2[`avg_${parameter}`]} µg/m³
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-success-700 dark:text-success-300">Max {parameter.toUpperCase()}</dt>
                <dd className="font-semibold text-success-900 dark:text-success-100">
                  {summaryData.station2[`max_${parameter}`]} µg/m³
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-success-700 dark:text-success-300">Min {parameter.toUpperCase()}</dt>
                <dd className="font-semibold text-success-900 dark:text-success-100">
                  {summaryData.station2[`min_${parameter}`]} µg/m³
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comparison;