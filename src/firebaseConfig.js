import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAc8fJIOOBRJUiSnS6HmoAfAxpvKnL-I0Y",
  authDomain: "fangram-3c63f.firebaseapp.com",
  projectId: "fangram-3c63f",
  storageBucket: "fangram-3c63f.appspot.com",
  messagingSenderId: "204661684293",
  appId: "1:204661684293:web:3deec162542b86cda40b2c",
  measurementId: "G-914YSZ05FD"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export default app;