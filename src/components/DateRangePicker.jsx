import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DateRangePicker({ onChange }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (update) => {
    setDateRange(update);
    if (onChange && update[0] && update[1]) {
      onChange(update);
    }
  };

  return (
    <div className="relative">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        className="input w-full"
        placeholderText="Select date range"
        dateFormat="MMM d, yyyy"
      />
    </div>
  );
}

export default DateRangePicker;