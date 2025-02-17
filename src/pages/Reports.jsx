import { useState } from 'react';
import { DocumentArrowDownIcon, AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import LocationSearch from '../components/LocationSearch';
import DateRangePicker from '../components/DateRangePicker';

function Reports() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [reportType, setReportType] = useState('custom');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState([null, null]);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [reportName, setReportName] = useState('');

  const handleGenerateReport = () => {
    setIsNameDialogOpen(true);
  };

  const handleSubmitReport = () => {
    if (!reportName.trim()) return;
    
    // Here you would handle the report generation with the name
    console.log('Generating report:', {
      name: reportName,
      type: reportType,
      format: reportFormat,
      location: selectedLocation,
      dateRange,
    });
    
    setIsNameDialogOpen(false);
    setReportName('');
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-500/10 via-primary-500/5 to-transparent p-6 rounded-2xl">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 mb-6">
          Generate Reports
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <LocationSearch
            value={selectedLocation}
            onChange={setSelectedLocation}
            className="w-full"
          />
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="input bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
          >
            <option value="custom">Custom Range</option>
            <option value="monthly">Monthly Report</option>
            <option value="yearly">Yearly Report</option>
          </select>
          <select
            value={reportFormat}
            onChange={(e) => setReportFormat(e.target.value)}
            className="input bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
          >
            <option value="pdf">PDF Report</option>
            <option value="csv">CSV Export</option>
            <option value="excel">Excel Workbook</option>
          </select>
          {reportType === 'custom' && (
            <DateRangePicker onChange={setDateRange} />
          )}
        </div>
        <button 
          onClick={handleGenerateReport}
          className="mt-6 w-full btn-primary bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 flex items-center justify-center gap-2 py-3"
        >
          <DocumentArrowDownIcon className="h-5 w-5" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold">Recent Reports</h3>
            <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'March 2025 Summary', date: '2025-03-01', type: 'Monthly', location: 'Station 1 - Downtown', size: '2.4 MB' },
              { name: 'February 2025 Summary', date: '2025-02-01', type: 'Monthly', location: 'Station 2 - Industrial', size: '1.8 MB' },
              { name: '2024 Annual Report', date: '2024-12-31', type: 'Yearly', location: 'All Stations', size: '5.2 MB' },
            ].map((report) => (
              <div
                key={report.name}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                    <DocumentArrowDownIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {report.location} • {report.size}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Generated on {report.date}
                    </p>
                  </div>
                </div>
                <button className="sm:opacity-0 group-hover:opacity-100 transition-opacity text-primary-600 hover:text-primary-700 dark:text-primary-400 w-full sm:w-auto">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold">Report Settings</h3>
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Include Sections
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Air Quality Summary',
                  'Anomaly Analysis',
                  'Sensor Health',
                  'Comparative Analysis',
                  'Weather Correlation',
                  'Trend Analysis',
                ].map((section) => (
                  <label key={section} className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
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

      {/* Report Name Dialog */}
      <Dialog
        open={isNameDialogOpen}
        onClose={() => setIsNameDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-semibold">
                Name Your Report
              </Dialog.Title>
              <button
                onClick={() => setIsNameDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="reportName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Report Name
                </label>
                <input
                  type="text"
                  id="reportName"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Enter a name for your report"
                  className="w-full input bg-white dark:bg-gray-700"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsNameDialogOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReport}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default Reports;