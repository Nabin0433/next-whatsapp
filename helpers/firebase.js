import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCKCLHGzCwMO8ADP0kdJW4x7cSLprFYbng",
  authDomain: "whats-app-next-js.firebaseapp.com",
  projectId: "whats-app-next-js",
  storageBucket: "whats-app-next-js.appspot.com",
  messagingSenderId: "581572106084",
  appId: "1:581572106084:web:8b1af5a9c0850e879a0c71",
  measurementId: "G-K0DGRSLJMX",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
