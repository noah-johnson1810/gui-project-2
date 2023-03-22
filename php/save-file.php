<?php
$stringToSave = $_POST['saveFile'];
$fileName = 'savedBasket.txt';
file_put_contents($fileName, $stringToSave);
header('Location: http://localhost');
exit;
