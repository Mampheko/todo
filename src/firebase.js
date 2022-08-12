import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCODFD8li6tKlQSbuh024R_RmskIFQTa5w",
  authDomain: "todolist-a9d7d.firebaseapp.com",
  databaseURL: "https://todolist-a9d7d-default-rtdb.firebaseio.com",
  projectId: "todolist-a9d7d",
  storageBucket: "todolist-a9d7d.appspot.com",
  messagingSenderId: "439214739572",
  appId: "1:439214739572:web:9343c73a6e8694d97fc121"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);