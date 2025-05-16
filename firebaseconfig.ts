import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9QyoMVnb8-sYNS2Xmk113nfYTfiaUCrM",
  authDomain: "notepilot-9a73c.firebaseapp.com",
  projectId: "notepilot-9a73c",
  storageBucket: "notepilot-9a73c.firebasestorage.app",
  messagingSenderId: "94739527685",
  appId: "1:94739527685:web:33140710be55b686f5446c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);