// Author: Noah Johnson
// Class: CSC 468
// Description: PHP file to save a basket file which is passed in as a parameter

<?php
$stringToSave = $_POST['saveFile'];
$fileName = 'savedBasket.txt';
file_put_contents($fileName, $stringToSave);
header('Location: http://localhost');
exit;
