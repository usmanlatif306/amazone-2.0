import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBTemiLfBzEi7141Ik9-McZU3qoJhD_rz8",
  authDomain: "clone-b96bd.firebaseapp.com",
  projectId: "clone-b96bd",
  storageBucket: "clone-b96bd.appspot.com",
  messagingSenderId: "678497939366",
  appId: "1:678497939366:web:88ddb0fe5a31a0e019e967",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export default db;
