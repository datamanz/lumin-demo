import { useState, useEffect } from 'react';
import { FilterOptions } from '@/types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const airports = [
    'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bodrum',
    'Dalaman', 'Trabzon', 'Gaziantep', 'Adana', 'Kayseri'
  ];

  useEffect(() => {
    if (filters.dateRange?.start && !filters.dateRange?.end) {
      onFilterChange({
        ...filters,
        dateRange: {
          start: filters.dateRange.start,
          end: filters.dateRange.start
        }
      });
    }
  }, [filters.dateRange?.start]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sticky top-0 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        <span>Filtreler</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Durum
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                status: e.target.value as FilterOptions['status']
              })}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="">Tümü</option>
              <option value="confirmed">Onaylandı</option>
              <option value="pending">Beklemede</option>
              <option value="cancelled">İptal Edildi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Kalkış
            </label>
            <select
              value={filters.departure || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                departure: e.target.value || undefined
              })}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="">Tümü</option>
              {airports.map(airport => (
                <option key={airport} value={airport}>{airport}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Varış
            </label>
            <select
              value={filters.arrival || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                arrival: e.target.value || undefined
              })}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="">Tümü</option>
              {airports.map(airport => (
                <option key={airport} value={airport}>{airport}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Tarih Aralığı
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={filters.dateRange?.start || ''}
                onChange={(e) => {
                  const start = e.target.value;
                  const end = filters.dateRange?.end || start;
                  onFilterChange({
                    ...filters,
                    dateRange: { start, end }
                  });
                }}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
              <input
                type="date"
                value={filters.dateRange?.end || ''}
                min={filters.dateRange?.start}
                onChange={(e) => {
                  const end = e.target.value;
                  const start = filters.dateRange?.start || end;
                  onFilterChange({
                    ...filters,
                    dateRange: { start, end }
                  });
                }}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 