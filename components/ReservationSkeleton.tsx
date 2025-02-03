export default function ReservationSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
        </div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
} 