<?php 

if (isset($_POST['endpoint'])){
	$handle = fopen('endpoints.txt', 'a+');
	fwrite($handle, $_POST['endpoint'] . PHP_EOL); 
	fclose($handle);
}