import Select from 'react-select';
import { useState } from 'react';

// Simulated large dataset of 1000 locations
const generateLocations = () => {
  const locations = [];
  const areas = ['Downtown', 'Industrial', 'Residential', 'Suburban', 'Port', 'Commercial', 'Rural'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio'];

  for (let i = 1; i <= 1000; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    locations.push({
      value: `station${i}`,
      label: `Station ${i} - ${area}`,
      city: city,
      area: area,
      coordinates: `${(Math.random() * 180 - 90).toFixed(4)}, ${(Math.random() * 360 - 180).toFixed(4)}`,
    });
  }
  return locations;
};

const allLocations = generateLocations();

function LocationSearch({ value, onChange, className }) {
  const [inputValue, setInputValue] = useState('');

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: 'var(--bg-input)',
      borderColor: state.isFocused ? 'var(--color-primary-500)' : 'var(--border-color)',
      boxShadow: state.isFocused ? '0 0 0 1px var(--color-primary-500)' : 'none',
      '&:hover': {
        borderColor: 'var(--color-primary-500)',
      },
    }),
    menu: (base) => ({
      ...base,
      background: 'var(--bg-dropdown)',
      border: '1px solid var(--border-color)',
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? 'var(--bg-hover)' : 'transparent',
      color: 'var(--text-primary)',
      '&:hover': {
        background: 'var(--bg-hover)',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--text-primary)',
    }),
    input: (base) => ({
      ...base,
      color: 'var(--text-primary)',
    }),
    groupHeading: (base) => ({
      ...base,
      color: 'var(--text-primary)',
      fontWeight: 600,
      fontSize: '0.875rem',
    }),
  };

  const filterLocations = (inputValue) => {
    return allLocations.filter(location => 
      location.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      location.city.toLowerCase().includes(inputValue.toLowerCase()) ||
      location.area.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterLocations(inputValue));
    }, 100);
  };

  return (
    <div className={className}>
      <Select
        value={value}
        onChange={onChange}
        onInputChange={(newValue) => setInputValue(newValue)}
        options={filterLocations(inputValue)}
        styles={customStyles}
        className="text-gray-900 dark:text-white"
        placeholder="Search 1000+ locations..."
        isSearchable
        formatOptionLabel={({ label, city, coordinates }) => (
          <div>
            <div className="font-medium">{label}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {city} • {coordinates}
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default LocationSearch;