<?php

$data = array();

$handle = fopen("endpoints.txt", "r");
if ($handle) {
    while (($line = fgets($handle)) !== false) {
        $data['registration_ids'][] = trim(str_replace(array('https://android.googleapis.com/gcm/send/', PHP_EOL, "\r", "\n"), '', $line));
    }
    fclose($handle);
} else {
    die();
}

$url = "https://android.googleapis.com/gcm/send";
$content = json_encode($data);

echo $content.'<br><br>';

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HEADER, false); // don't return headers
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json", "Authorization: key=AIzaSyBxmzk9L0qaQIWSCSr_BtpzxqarCdYoPfU"));
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
curl_setopt($curl, CURLOPT_ENCODING, "utf-8");
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($curl);

$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

if ($status != 201) {
    die("Error: call to URL $url failed with status $status, response $response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl)).'<br><br>';
}

curl_close($curl);

print_r($response);

//https://developers.google.com/cloud-messaging/http-server-ref#downstream-http-messages-json
