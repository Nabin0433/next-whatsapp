import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../helpers/firebase";
import firebase from "firebase";
import Login from "./login";
import Loding from "../components/Loding";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loding] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoUrl: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loding) return <Loding />;
  if (!user) return <Login />;
  if (user) return <Component {...pageProps} />;
}

export default MyApp;
