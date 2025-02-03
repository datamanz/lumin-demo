import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../lib/firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const users = [
  { email: 'admin@lumflights.com', password: 'admin123', role: 'admin' },
  { email: 'staff1@lumflights.com', password: 'staff123', role: 'staff' },
  { email: 'staff2@lumflights.com', password: 'staff123', role: 'staff' },
  { email: 'staff3@lumflights.com', password: 'staff123', role: 'staff' },
  { email: 'staff4@lumflights.com', password: 'staff123', role: 'staff' },
  { email: 'staff5@lumflights.com', password: 'staff123', role: 'staff' },
  { email: 'staff6@lumflights.com', password: 'staff123', role: 'staff' },
  { email: 'staff7@lumflights.com', password: 'staff123', role: 'staff' },
  { email: 'staff8@lumflights.com', password: 'staff123', role: 'staff' },
  { email: 'staff9@lumflights.com', password: 'staff123', role: 'staff' },
];

async function createUsers() {
  for (const user of users) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      // Firestore'a kullanıcı rolünü kaydet
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: user.email,
        role: user.role,
        createdAt: new Date().toISOString()
      });

      console.log(`Kullanıcı oluşturuldu: ${user.email}`);
    } catch (error: any) {
      console.error(`Hata: ${user.email}:`, error.message);
    }
  }
}

createUsers().then(() => console.log('Tüm kullanıcılar oluşturuldu!')); 