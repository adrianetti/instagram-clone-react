import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCd12VsX9QZ-YfspCKZrEoNsugLGOhtEsY",
  authDomain: "instagram-clon-adrian.firebaseapp.com",
  databaseURL: "https://instagram-clon-adrian.firebaseio.com",
  projectId: "instagram-clon-adrian",
  storageBucket: "instagram-clon-adrian.appspot.com",
  messagingSenderId: "247825560731",
  appId: "1:247825560731:web:d6fee213a63dc59f61423e",
  measurementId: "G-NBPPTQ2GF4"
})

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };