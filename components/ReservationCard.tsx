import { Reservation } from '@/types';

interface ReservationCardProps {
  reservation: Reservation;
  onClick: () => void;
  showCustomerDetails: boolean;
}

export default function ReservationCard({
  reservation,
  onClick,
  showCustomerDetails
}: ReservationCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Uçuş #{reservation.flightNumber}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(reservation.departureDate).toLocaleDateString('tr-TR')}
          </p>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            reservation.status === 'confirmed'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : reservation.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {reservation.status === 'confirmed' ? 'Onaylandı' : 
           reservation.status === 'pending' ? 'Beklemede' : 'İptal Edildi'}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Kalkış:</span> {reservation.departure}
        </p>
        <p className="text-sm">
          <span className="font-medium">Varış:</span> {reservation.arrival}
        </p>
        {showCustomerDetails && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Yolcular:</p>
            <ul className="text-sm text-gray-600 dark:text-gray-300">
              {reservation.customers.map((customer) => (
                <li key={customer.id}>{customer.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 