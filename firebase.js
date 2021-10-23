import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1anlqu9WQgi45oYH7YkQyngCXhNrN9dw",
  authDomain: "thuiskapper.firebaseapp.com",
  projectId: "thuiskapper",
  storageBucket: "thuiskapper.appspot.com",
  messagingSenderId: "368390956811",
  appId: "1:368390956811:web:96427f5372d54a39bce40e",
  measurementId: "G-6P8H87Y8FB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
