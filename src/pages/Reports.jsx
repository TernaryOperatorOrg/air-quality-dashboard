import { useState } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import LocationSearch from '../components/LocationSearch';
import DateRangePicker from '../components/DateRangePicker';

function Reports() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [reportType, setReportType] = useState('custom');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold">Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:w-auto">
          <LocationSearch
            value={selectedLocation}
            onChange={setSelectedLocation}
            className="w-full md:w-64"
          />
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="input"
          >
            <option value="custom">Custom Range</option>
            <option value="monthly">Monthly Report</option>
            <option value="yearly">Yearly Report</option>
          </select>
          <select
            value={reportFormat}
            onChange={(e) => setReportFormat(e.target.value)}
            className="input"
          >
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
          </select>
          {reportType === 'custom' && (
            <DateRangePicker onChange={setDateRange} />
          )}
          <button className="btn-primary flex items-center justify-center gap-2 md:col-span-4">
            <DocumentArrowDownIcon className="h-5 w-5" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
          <div className="space-y-4">
            {[
              { name: 'March 2025 Summary', date: '2025-03-01', type: 'Monthly', location: 'Station 1 - Downtown' },
              { name: 'February 2025 Summary', date: '2025-02-01', type: 'Monthly', location: 'Station 2 - Industrial' },
              { name: '2024 Annual Report', date: '2024-12-31', type: 'Yearly', location: 'All Stations' },
            ].map((report) => (
              <div
                key={report.name}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {report.location} • Generated on {report.date}
                  </p>
                </div>
                <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                  <DocumentArrowDownIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Report Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Include Sections
              </label>
              <div className="space-y-2">
                {[
                  'Air Quality Summary',
                  'Anomaly Analysis',
                  'Sensor Health',
                  'Comparative Analysis',
                ].map((section) => (
                  <label key={section} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{section}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;