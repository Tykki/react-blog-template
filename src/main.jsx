import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzVpe2jNF9o5RE9BZHfk-b08kPsJj_iN4",
  authDomain: "blog-template-d118d.firebaseapp.com",
  projectId: "blog-template-d118d",
  storageBucket: "blog-template-d118d.appspot.com",
  messagingSenderId: "655169024572",
  appId: "1:655169024572:web:80e6e8263875c457610939"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
