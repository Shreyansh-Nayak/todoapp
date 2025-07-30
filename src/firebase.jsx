
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxdcTY2fjoXg7Ogthk6M8gc3DczNOGUYM",
  authDomain: "itask-8e510.firebaseapp.com",
  projectId: "itask-8e510",
  storageBucket: "itask-8e510.appspot.com",

  messagingSenderId: "548017830982",
  appId: "1:548017830982:web:531af4821f8dc72de21e47"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
