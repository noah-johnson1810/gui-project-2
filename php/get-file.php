// Author: Noah Johnson
// Class: CSC 468
// Description: PHP file to get the contents of the file savedBasket.txt

<?php
$fileName = 'savedBasket.txt';
if (file_exists($fileName)) {
  $stringToLoad = file_get_contents($fileName);
  echo $stringToLoad;
}
