import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceDot, BarChart, Bar } from 'recharts';
import LocationSearch from '../components/LocationSearch';
import DateRangePicker from '../components/DateRangePicker';

function AnomalyDetection() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [timelineData, setTimelineData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [anomalyList, setAnomalyList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedLocation, selectedSeverity, dateRange]);

  const fetchData = async () => {
    try {
      // Construct query parameters
      const params = new URLSearchParams({
        location_id: selectedLocation?.value || '',
        severity: selectedSeverity,
        start_date: dateRange[0]?.toISOString() || '',
        end_date: dateRange[1]?.toISOString() || ''
      });

      // Fetch timeline data
      // Expected Response:
      // {
      //   data: [
      //     {
      //       time: string (ISO timestamp),
      //       pm25: number,
      //       pm10: number,
      //       isAnomaly: boolean
      //     }
      //   ]
      // }
      const timelineResponse = await fetch(`http://localhost:5000/api/anomalies/timeline?${params}`);
      const timelineJson = await timelineResponse.json();
      setTimelineData(timelineJson.data);

      // Fetch distribution data
      // Expected Response:
      // {
      //   data: [
      //     {
      //       hour: string (format: "HH-HH"),
      //       anomalies: number
      //     }
      //   ]
      // }
      const distributionResponse = await fetch(`http://localhost:5000/api/anomalies/distribution?${params}`);
      const distributionJson = await distributionResponse.json();
      setDistributionData(distributionJson.data);

      // Fetch anomaly list
      // Expected Response:
      // {
      //   data: [
      //     {
      //       id: string,
      //       timestamp: string (ISO timestamp),
      //       location: {
      //         id: string,
      //         name: string,
      //         area: string
      //       },
      //       parameter: string ("PM2.5" | "PM10"),
      //       value: number,
      //       unit: string,
      //       severity: string ("low" | "medium" | "high"),
      //       status: string ("investigating" | "resolved")
      //     }
      //   ]
      // }
      const listResponse = await fetch(`http://localhost:5000/api/anomalies/list?${params}`);
      const listJson = await listResponse.json();
      setAnomalyList(listJson.data);
    } catch (error) {
      console.error('Error fetching anomaly data:', error);
      // Handle error state here
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Anomaly Detection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <LocationSearch
            value={selectedLocation}
            onChange={setSelectedLocation}
            className="w-full"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Anomaly Timeline</h3>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
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
                {timelineData.map((entry, index) => 
                  entry.isAnomaly && (
                    <ReferenceDot
                      key={index}
                      x={entry.time}
                      y={entry.pm25}
                      r={6}
                      fill="#ef4444"
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  )
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Hourly Anomaly Distribution</h3>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" />
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
                  dataKey="anomalies" 
                  fill="#ef4444" 
                  name="Anomalies"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h3 className="text-lg font-semibold">Anomaly List</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {selectedLocation ? selectedLocation.label : 'All Locations'} •{' '}
            {dateRange[0] && dateRange[1]
              ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
              : 'All Time'}
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="text-left">
                  <th scope="col" className="py-3 px-4">Time</th>
                  <th scope="col" className="py-3 px-4">Location</th>
                  <th scope="col" className="py-3 px-4">Parameter</th>
                  <th scope="col" className="py-3 px-4">Value</th>
                  <th scope="col" className="py-3 px-4">Severity</th>
                  <th scope="col" className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {anomalyList.map((anomaly) => (
                  <tr key={anomaly.id}>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {new Date(anomaly.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {anomaly.location.name} - {anomaly.location.area}
                    </td>
                    <td className="py-3 px-4">{anomaly.parameter}</td>
                    <td className="py-3 px-4">{anomaly.value} {anomaly.unit}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        anomaly.severity === 'high' 
                          ? 'bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-200'
                          : anomaly.severity === 'medium'
                          ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200'
                          : 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                      }`}>
                        {anomaly.severity.charAt(0).toUpperCase() + anomaly.severity.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{
                      anomaly.status.charAt(0).toUpperCase() + anomaly.status.slice(1)
                    }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnomalyDetection;