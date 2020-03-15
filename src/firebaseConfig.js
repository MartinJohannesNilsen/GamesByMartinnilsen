import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyBJ1d_hf5V_glVnIAn7h4f7AaDhdqXeN1w",
  authDomain: "gamesbymartinnilsen.firebaseapp.com",
  databaseURL: "https://gamesbymartinnilsen.firebaseio.com",
  projectId: "gamesbymartinnilsen",
  storageBucket: "gamesbymartinnilsen.appspot.com",
  messagingSenderId: "834628519491",
  appId: "1:834628519491:web:0382a50ae138045caf36f6",
  measurementId: "G-RPX7CGTC7Y"
};
var firebaseConfig = firebase.initializeApp(config);
export default firebaseConfig;