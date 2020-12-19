import firebase from'firebase';
import 'firebase/firestore';

const config =  {
  apiKey: "AIzaSyAx3ZM1YpfTSiV4dennpgT3hiZcJ2959s8",
  authDomain: "cargamedb-p1.firebaseapp.com",
  databaseURL: "https://cargamedb-p1.firebaseio.com",
  projectId: "cargamedb-p1",
  storageBucket: "cargamedb-p1.appspot.com",
  messagingSenderId: "950532818245",
  appId: "1:950532818245:web:f583866904f66124bd2a2c",
  measurementId: "G-WJ6SMF3D9Y"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export default firebase;