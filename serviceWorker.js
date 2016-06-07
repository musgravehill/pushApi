'use strict';

function hashCode(input) {
    var hash = 0, i, chr, len;
    if (input.length === 0)
        return hash;
    for (i = 0, len = input.length; i < len; i++) {
        chr = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
;

var customUrl = '/';

console.log('Started', self);

self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log('ServiceWorker Installed', event);
});

self.addEventListener('activate', function(event) {
    console.log('ServiceWorker Activated', event);
});

self.addEventListener('push', function(event) {
    console.log('ServiceWorker Push message', event);

    event.waitUntil(
            fetch('/gcm-notify.json.php').then(function(response) {
        return response.json().then(function(data) {
            console.log(JSON.stringify(data));
            var title = data.title;
            var body = data.body;
            var icon = data.icon;
            customUrl = data.url + '&utm_source=pushApiGCM';

            self.registration.pushManager.getSubscription().then(function(subscription) {
                if (subscription) {
                    var endPoint = (subscription.endpoint).replace('https://android.googleapis.com/gcm/send/', '');
                    customUrl += '&utm_endpoint=' + endPoint
                    customUrl += '&utm_endpointHash=' + hashCode(endPoint);
                }
            });

            return self.registration.showNotification(title, {
                body: body,
                icon: icon,
                tag: 'notificationTag'
            });

        });
    }). catch (function(err) {
        console.error('Unable to retrieve data', err);
    })
            );
});

self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn’t close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    clients.openWindow(customUrl);

    /*
     // This looks to see if the current is already open and
     // focuses if it is
     event.waitUntil(clients.matchAll({
     type: "window"
     }).then(function(clientList) {
     for (var i = 0; i < clientList.length; i++) {
     var client = clientList[i];
     if (client.url == customUrl && 'focus' in client)
     return client.focus();
     }
     if (clients.openWindow)
     return clients.openWindow(customUrl);
     }));
     */

});

