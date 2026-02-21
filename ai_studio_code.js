// ১. ফায়ারবেস স্ক্রিপ্ট ইমপোর্ট করা (অবশ্যইcompat ভার্সন ব্যবহার করবেন)
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ২. আপনার ফায়ারবেস কনফিগারেশন এখানেও দিতে হবে
const firebaseConfig = {
    apiKey: "AIzaSyCYH0ZSeLjH_T3HJ9hVQ84afB5KyAEZi2Y",
    authDomain: "my-sc-tools.firebaseapp.com",
    databaseURL: "https://my-sc-tools-default-rtdb.firebaseio.com",
    projectId: "my-sc-tools",
    storageBucket: "my-sc-tools.firebasestorage.app",
    messagingSenderId: "285986090017",
    appId: "1:285986090017:web:de97d36b2ee56c74b74760",
};

// ৩. ফায়ারবেস ইনিশিয়ালাইজ করা
firebase.initializeApp(firebaseConfig);

// ৪. মেসেজিং সার্ভিস নেওয়া
const messaging = firebase.messaging();

// ৫. ব্যাকগ্রাউন্ড মেসেজ হ্যান্ডেলার
// এটি তখন কাজ করবে যখন ব্রাউজার ট্যাব বন্ধ থাকবে
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Background Message received: ', payload);
  
  const notificationTitle = payload.notification.title || 'Alert';
  const notificationOptions = {
    body: payload.notification.body || 'New Message Received',
    icon: 'https://i.ibb.co/v6m80kP/nusrat.jpg',
    badge: 'https://i.ibb.co/v6m80kP/nusrat.jpg',
    data: { url: payload.data ? payload.data.url : '/' }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ৬. নোটিফিকেশন ক্লিক করলে কি হবে
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const urlToOpen = event.notification.data.url || 'https://profile.imo.im/...';
    event.waitUntil(
        clients.openWindow(urlToOpen)
    );
});