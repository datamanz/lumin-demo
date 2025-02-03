'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, limit, orderBy, onSnapshot, where, startAfter, getDocs, QueryConstraint } from 'firebase/firestore';
import { db, auth, getTotalReservationCount } from '@/lib/firebase';
import { Reservation, FilterOptions, PaginationState } from '@/types';
import ReservationCard from '@/components/ReservationCard';
import ReservationModal from '@/components/ReservationModal';
import FilterBar from '@/components/FilterBar';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import EmptyState from '@/components/EmptyState';
import ReservationSkeleton from '@/components/ReservationSkeleton';

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function DashboardPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 5,
    total: 0
  });
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const fetchReservations = useCallback(async () => {
    if (!user) return null;

    // İlk yüklemede loading göster
    if (!reservations.length) {
      setIsLoading(true);
    }
    
    try {
      const baseQuery = query(
        collection(db, 'reservations'),
        orderBy('createdAt', 'desc')
      );

      const conditions: QueryConstraint[] = [];

      if (filters.status) {
        conditions.push(where('status', '==', filters.status));
      }
      if (filters.departure) {
        conditions.push(where('departure', '==', filters.departure));
      }
      if (filters.arrival) {
        conditions.push(where('arrival', '==', filters.arrival));
      }
      if (filters.dateRange?.start && filters.dateRange?.end) {
        conditions.push(
          where('departureDate', '>=', filters.dateRange.start),
          where('departureDate', '<=', filters.dateRange.end)
        );
      }

      conditions.push(limit(pagination.itemsPerPage));
      
      if (lastVisible && pagination.currentPage > 1) {
        conditions.push(startAfter(lastVisible));
      }

      const finalQuery = query(baseQuery, ...conditions);

      // Toplam sayıyı al
      getTotalReservationCount(filters).then(count => {
        setTotalItems(count);
      }).catch(error => {
        console.error('Toplam sayı alınamadı:', error);
      });

      // Gerçek zamanlı dinleme
      const unsubscribe = onSnapshot(finalQuery, {
        next: (snapshot) => {
          const newReservations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Reservation[];

          setReservations(newReservations);
          setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
          setIsLoading(false);
          setError(null);
        },
        error: (err) => {
          console.error('Dinleme hatası:', err);
          setError('Veriler alınırken bir hata oluştu');
          setIsLoading(false);
        }
      });

      return () => {
        try {
          unsubscribe();
        } catch (error) {
          console.error('Dinleme kapatılırken hata:', error);
        }
      };

    } catch (error) {
      console.error('Rezervasyonlar yüklenirken hata:', error);
      setError('Rezervasyonlar yüklenirken bir hata oluştu');
      setIsLoading(false);
      return null;
    }
  }, [user, filters, pagination.currentPage, pagination.itemsPerPage, lastVisible, reservations.length]);

  // useEffect'i güncelle
  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const setupSubscription = async () => {
      if (user) {
        const unsubscribe = await fetchReservations();
        if (typeof unsubscribe === 'function') {
          cleanup = unsubscribe;
        }
      }
    };

    setupSubscription();

    // Cleanup function
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [fetchReservations, user]);

  // Auth kontrolü
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const debouncedFilterChange = useCallback(
    debounce((newFilters: FilterOptions) => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, currentPage: 1 }));
      setLastVisible(null);
      setReservations([]); // Filtreleme sırasında listeyi temizle
    }, 300),
    []
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Rezervasyon Yönetimi
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {role === 'admin' ? 'Admin' : 'Staff'} olarak giriş yapıldı
            </span>
            <button
              onClick={() => auth.signOut()}
              className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          filters={filters}
          onFilterChange={debouncedFilterChange}
        />

        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={fetchReservations} 
          />
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {[...Array(6)].map((_, i) => (
              <ReservationSkeleton key={i} />
            ))}
          </div>
        ) : reservations.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onClick={() => setSelectedReservation(reservation)}
                showCustomerDetails={role === 'admin'}
              />
            ))}
          </div>
        )}

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={Math.ceil(totalItems / pagination.itemsPerPage)}
          onPageChange={(page) => {
            setPagination(prev => ({ ...prev, currentPage: page }));
          }}
        />
      </main>

      {selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          isAdmin={role === 'admin'}
        />
      )}
    </div>
  );
} 