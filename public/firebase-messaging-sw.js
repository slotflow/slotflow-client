importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyDdeMzf8l5Wt2RO4Aszkw0jpo-HJNm6a4M",
  authDomain: "slotflow-a3e40.firebaseapp.com",
  projectId: "slotflow-a3e40",
  storageBucket: "slotflow-a3e40.firebasestorage.app",
  messagingSenderId: "837453096498",
  appId: "1:837453096498:web:a5999b30a3f2a4b211fe2b",
  measurementId: "G-F2PZV2N6GF",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("received background message : ",payload);
});
