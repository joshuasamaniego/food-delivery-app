import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBrQDuf4PEKpHCo1XjiZ7pJmCR_kZ8cWz8",
    authDomain: "food-delivery-app-f31d1.firebaseapp.com",
    databaseURL: "https://food-delivery-app-f31d1-default-rtdb.firebaseio.com",
    projectId: "food-delivery-app-f31d1",
    storageBucket: "food-delivery-app-f31d1.appspot.com",
    messagingSenderId: "456938254208",
    appId: "1:456938254208:web:d8070992bc0d976b379b65"
};

firebase.initializeApp(firebaseConfig);
export default firebase;