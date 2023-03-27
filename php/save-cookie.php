<?php
if (isset($_POST["cookieName"]) && isset($_POST["cookieValue"])) {
  $cookieName = $_POST["cookieName"];
  $cookieValue = $_POST["cookieValue"];
  setcookie($cookieName, $cookieValue, time() + (86400 * 30), "/");
}
?>
