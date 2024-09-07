import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzWmVWPVrb4mITMglZad2O0wuiNvQWHpQ",
  authDomain: "symstax-521bd.firebaseapp.com",
  projectId: "symstax-521bd",
  storageBucket: "symstax-521bd.appspot.com",
  messagingSenderId: "867115832006",
  appId: "1:867115832006:web:85b1b084978dc6fc14fdc7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
