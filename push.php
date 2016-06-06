<?php 

$handle = fopen("endpoints.txt", "r");
if ($handle) {
    while (($line = fgets($handle)) !== false) {
        $endpoint = str_replace('https://android.googleapis.com/gcm/send/');
    }
    fclose($handle);
} else {
    // error opening the file.
} 