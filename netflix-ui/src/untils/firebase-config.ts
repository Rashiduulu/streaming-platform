import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyArMYtGMx5JfhTzDMh3Aqe8lppLPtrwEe8",
    authDomain: "react-netflix-clone-a032a.firebaseapp.com",
    projectId: "react-netflix-clone-a032a",
    storageBucket: "react-netflix-clone-a032a.appspot.com",
    messagingSenderId: "566307160365",
    appId: "1:566307160365:web:a309046c4c818b2c1453a4",
    measurementId: "G-6FMWVBLPFX"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)