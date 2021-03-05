import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage
require('firebase/auth')

  var firebaseConfig = {
    apiKey: "AIzaSyAfIx1LftEdp--qkNom9HpPHlEY4HBuN74",
    authDomain: "login-form-832f7.firebaseapp.com",
    projectId: "login-form-832f7",
    storageBucket: "login-form-832f7.appspot.com",
    messagingSenderId: "56815340357",
    appId: "1:56815340357:web:5b95303e5b50c96ae84c2c"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;