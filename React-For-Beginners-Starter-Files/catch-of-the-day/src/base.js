import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCAPFpEp8T2VcHQe4u2YSxlHladw_WTmCM",
    authDomain: "catch-of-the-day-asherphilip.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-asherphilip.firebaseio.com",
    projectId: "catch-of-the-day-asherphilip",
    storageBucket: "catch-of-the-day-asherphilip.appspot.com",
    messagingSenderId: "537248697122"
});

const base = Rebase.createClass(firebaseApp.database());

//this is named export
export { firebaseApp };
    
    //this is a default export
export default base;
