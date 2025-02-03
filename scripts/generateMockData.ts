import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { faker } from '@faker-js/faker/locale/tr';
import { firebaseConfig } from '../lib/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function generateMockData() {
  const airports = [
    'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bodrum',
    'Dalaman', 'Trabzon', 'Gaziantep', 'Adana', 'Kayseri'
  ];

  const aiSuggestions = [
    'Yolcunun özel yemek tercihi var, uçuş öncesi kontrol edilmeli.',
    'Bu rotada geçmiş uçuşlarda sık sık türbülans yaşanıyor, yolcular bilgilendirilmeli.',
    'Bagaj kapasitesi sınırına yaklaşıldı, ek önlemler alınmalı.',
    'VIP yolcu mevcut, özel karşılama hizmeti planlanmalı.',
    'Hava durumu nedeniyle gecikme riski var, alternatif planlar hazırlanmalı.'
  ];

  for (let i = 0; i < 1000; i++) {
    const departure = faker.helpers.arrayElement(airports);
    let arrival;
    do {
      arrival = faker.helpers.arrayElement(airports);
    } while (arrival === departure);

    const customersCount = faker.number.int({ min: 1, max: 3 });
    const customers = Array.from({ length: customersCount }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number()
    }));

    const reservation = {
      flightNumber: `LF${faker.number.int({ min: 1000, max: 9999 })}`,
      departure,
      arrival,
      departureDate: faker.date.future().toISOString(),
      arrivalDate: faker.date.future().toISOString(),
      status: faker.helpers.arrayElement(['confirmed', 'pending', 'cancelled']),
      customers,
      createdAt: faker.date.recent().toISOString(),
      aiSuggestions: faker.helpers.arrayElements(aiSuggestions, { min: 1, max: 3 })
    };

    await addDoc(collection(db, 'reservations'), reservation);
  }
}

generateMockData().then(() => console.log('Mock data generated successfully!')); 