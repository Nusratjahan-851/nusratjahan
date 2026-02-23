importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCYH0ZSeLjH_T3HJ9hVQ84afB5KyAEZi2Y",
  authDomain: "my-sc-tools.firebaseapp.com",
  projectId: "my-sc-tools",
  messagingSenderId: "285986090017",
  appId: "1:285986090017:web:9d872b9bb5c472bcb74760"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload=>{
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "icon.png",
      data:{url: payload.notification.click_action}
    }
  );
});

self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url));
});
