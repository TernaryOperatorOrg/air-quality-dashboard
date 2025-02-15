import { useState } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

function Reports() {
  const [reportType, setReportType] = useState('monthly');
  const [reportFormat, setReportFormat] = useState('pdf');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports</h2>
        <div className="flex gap-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="input"
          >
            <option value="monthly">Monthly Report</option>
            <option value="yearly">Yearly Report</option>
            <option value="custom">Custom Range</option>
          </select>
          <select
            value={reportFormat}
            onChange={(e) => setReportFormat(e.target.value)}
            className="input"
          >
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
          </select>
          <button className="btn-primary flex items-center gap-2">
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
              { name: 'March 2025 Summary', date: '2025-03-01', type: 'Monthly' },
              { name: 'February 2025 Summary', date: '2025-02-01', type: 'Monthly' },
              { name: '2024 Annual Report', date: '2024-12-31', type: 'Yearly' },
            ].map((report) => (
              <div
                key={report.name}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generated on {report.date}
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