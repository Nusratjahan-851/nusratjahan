// sw.js
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'Alert', body: 'New Message' };
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'https://i.ibb.co/v6m80kP/nusrat.jpg'
        })
    );
});
