// Author: Noah Johnson
// Class: CSC 468
// Description: PHP file to save a PHP cookie with name and value passed in as parameters

<?php
if (isset($_POST["cookieName"]) && isset($_POST["cookieValue"])) {
  // Get the name and value of the cookie from the POST parameters
  $cookieName = $_POST["cookieName"];
  $cookieValue = $_POST["cookieValue"];

  // Clear the existing cookie with the specified name
  setcookie($cookieName, "", time() - 3600, "/"); // Expire the cookie by setting the expiration time to the past

  // Set the cookie with the specified name and value
  setcookie($cookieName, $cookieValue, time() + (86400 * 30), "/"); // Cookie will expire in 30 days
}

?>
