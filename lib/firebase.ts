import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { collection, query, where, getCountFromServer, QueryConstraint } from 'firebase/firestore';
import { FilterOptions } from '@/types';

export const firebaseConfig = {
  // Firebase console'dan alınan config bilgileri buraya gelecek
  apiKey: "AIzaSyBepn19wGrk1LF15ZS2pjzzbso2D0fcBE8",
  authDomain: "lumia-demo-15cf8.firebaseapp.com",
  projectId: "lumia-demo-15cf8",
  storageBucket: "lumia-demo-15cf8.firebasestorage.app",
  messagingSenderId: "631154045554",
  appId: "1:631154045554:web:c93c2d00859f3ca701c8eb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function getTotalReservationCount(filters: FilterOptions = {}) {
  try {
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

    const q = query(collection(db, 'reservations'), ...conditions);
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error('Toplam sayı alınırken hata:', error);
    return 0;
  }
} 