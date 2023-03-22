<?php
$fileName = 'savedBasket.txt';
if (file_exists($fileName)) {
  $stringToLoad = file_get_contents($fileName);
  echo $stringToLoad;
} else {
  echo 'File not found';
}
