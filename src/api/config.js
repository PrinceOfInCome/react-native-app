import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBepWCPvudGQnVY7e8MeXlr4LpkpIhjTqU",
  databaseURL: "https://sns-vvc.firebaseio.com/",
  projectId: "sns-vvc ",
  appId: "1:453601679643:android:e011238d765f1ad6ad5bbe",
};

export default Firebase.initializeApp(firebaseConfig);
