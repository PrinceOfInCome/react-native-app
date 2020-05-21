import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBepWCPvudGQnVY7e8MeXlr4LpkpIhjTqU",
    authDomain: "sns-vvc.firebaseapp.com",
    databaseURL: "https://sns-vvc.firebaseio.com",
    projectId: "sns-vvc",
    storageBucket: "sns-vvc.appspot.com",
    messagingSenderId: "453601679643",
    appId: "1:453601679643:web:2851c1d2ff431501ad5bbe",
    measurementId: "G-V2EDVXJ43F"
  };
export const firebaseApp = firebase.initializeApp(config);
