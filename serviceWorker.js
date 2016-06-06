'use strict';

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
      fetch('/gcm-notify.json').then(function(response) { 
            return response.json().then(function(data) { 
            console.log(JSON.stringify(data));
                var title = data.title;  
                var body = data.body;  
				var icon = data.icon;
                var url=data.url;     

                return self.registration.showNotification(title, {  
                  body: body,  
                  icon: icon,  
                  tag: 'notificationTag'  
                }); 

            });  
      }).catch(function(err) {  
          console.error('Unable to retrieve data', err);  
        })  
      );   
});