<!DOCTYPE html>
<html>
    <head>
        <meta charset='UTF-8'>
        <title>Push Notification codelab</title>
        <link rel="manifest" href="manifest.json">
        <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
    </head>
    <body>
        <h1>Push Notification</h1>

        This page must be accessed using HTTPS or via localhost. <br><br>

        Chrome doesn't support payloads using the GCM method!!!!!! <br><br>

        userVisibleOnly <br>

        Chrome requires you to set the userVisibleOnly parameter to true when subscribing to the push service,
        which indicates that we are promising to show a notification whenever a push is received.
        This can be seen in action in our subscribe() function. <br><br><br>

        <script>
            'use strict';

            if ('serviceWorker' in navigator) {
                console.log('Service Worker is supported');
                navigator.serviceWorker.register('serviceWorker.js').then(function() {
                    return navigator.serviceWorker.ready;
                }).then(function(reg) {
                    console.log('Service Worker is ready :^)', reg);
                    reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
                        console.log('endpoint:', sub.endpoint);

                        var params = {};
                        params['endpoint'] = sub.endpoint;
                        $.post("/collectEndpoints.php", params).done(function() {
                            console.log('SEND endpoint TO TXT');
                        });

                    });
                }). catch (function(error) {
                    console.log('Service Worker error :^(', error);
                });
            }

        </script>

    </body>
</html>
