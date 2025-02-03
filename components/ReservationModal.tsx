import { Reservation } from '@/types';
import { useState } from 'react';

interface ReservationModalProps {
  reservation: Reservation;
  onClose: () => void;
  isAdmin: boolean;
}

export default function ReservationModal({
  reservation,
  onClose,
  isAdmin
}: ReservationModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'ai'>('details');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Rezervasyon Detayları
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'details'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Detaylar
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'ai'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setActiveTab('ai')}
            >
              AI Önerileri
            </button>
          </div>

          <div className="overflow-y-auto max-h-[60vh]">
            {activeTab === 'details' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Uçuş Bilgileri</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Uçuş Numarası</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {reservation.flightNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Durum</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {reservation.status}
                      </p>
                    </div>
                    {/* Diğer uçuş detayları */}
                  </div>
                </div>

                {isAdmin && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Yolcu Bilgileri</h3>
                    {reservation.customers.map((customer) => (
                      <div key={customer.id} className="mb-4 p-4 border rounded-lg">
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {customer.email}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {customer.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {reservation.aiSuggestions?.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 