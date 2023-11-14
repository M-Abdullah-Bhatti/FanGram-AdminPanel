// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyAciIcnODsqnDEEzvwObQlE8cWuSAozW3g",
  // authDomain: "fir-upload-ee1d4.firebaseapp.com",
  // projectId: "fir-upload-ee1d4",
  // storageBucket: "fir-upload-ee1d4.appspot.com",
  // messagingSenderId: "643186072936",
  // appId: "1:643186072936:web:c08a2f8c08c76926e2cadd",
  // measurementId: "G-DHM3SF407S"

  //   apiKey: "AIzaSyAGySuuxHC2TvvX8RgwFEKged7F1X6tE7s",
  //   authDomain: "test-realtime01-fd666.firebaseapp.com",
  //   databaseURL: "https://test-realtime01-fd666-default-rtdb.firebaseio.com",
  //   projectId: "test-realtime01-fd666",
  //   storageBucket: "test-realtime01-fd666.appspot.com",
  //   messagingSenderId: "301296665733",
  //   appId: "1:301296665733:web:b44aedde6429b8aa0355ec"

  // apiKey: "AIzaSyCjhkAFR_ZbYwt2q8c0B9Cm1e0j3Qsp_sk",
  // authDomain: "riwa-nft-adminpanel.firebaseapp.com",
  // projectId: "riwa-nft-adminpanel",
  // storageBucket: "riwa-nft-adminpanel.appspot.com",
  // messagingSenderId: "877301077665",
  // appId: "1:877301077665:web:42d2d540464d90df2cc2e0"

  apiKey: "AIzaSyBRee-vNvPVsNqJFnmw5LsCGlFd07Le2G4",
  authDomain: "riwa-tech.firebaseapp.com",
  projectId: "riwa-tech",
  storageBucket: "riwa-tech.appspot.com",
  messagingSenderId: "37584956430",
  appId: "1:37584956430:web:0823f61a0eef727915605f",
  measurementId: "G-QSYEGESW3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export default app;