// /* <script type="module"> */
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import {getAuth,GoogleAuthProvider} from "firebase/auth"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyBBSrGTwziVWPBrM0elBnHhHL6dos_hbvA",
//     authDomain: "e-commerce-furniture-shop.firebaseapp.com",
//     projectId: "e-commerce-furniture-shop",
//     storageBucket: "e-commerce-furniture-shop.appspot.com",
//     messagingSenderId: "503084804336",
//     appId: "1:503084804336:web:4d4e4a2ba2bbf3ce007a35",
//     measurementId: "G-PZZ17DQKRR"
//   };



const firebaseConfig = {
    apiKey: "AIzaSyCHFvG9Qt0NwpmRHBoFOwlrJvTwXxYkAIk",
    authDomain: "employease-fb443.firebaseapp.com",
    projectId: "employease-fb443",
    storageBucket: "employease-fb443.appspot.com",
    messagingSenderId: "465645981331",
    appId: "1:465645981331:web:d7f1e031ab95f0c6a20766",
    measurementId: "G-PKNDP2KVED"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const analytics = getAnalytics(app);
  export {auth,provider}

// </script>