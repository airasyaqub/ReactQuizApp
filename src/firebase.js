import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyAvTDv8BkWSptm5EU0Va_UlGxnQ_scTxi8",
  authDomain: "panacloud-69d98.firebaseapp.com",
  databaseURL: "https://panacloud-69d98.firebaseio.com",
  projectId: "panacloud-69d98",
  storageBucket: "panacloud-69d98.appspot.com",
  messagingSenderId: "690148022392"
};

export default firebase.initializeApp(config);