<?php
if($_FILES['file']['error'] == 0){
    // Get the contents of the file as a string
    $fileContents = file_get_contents($_FILES['file']['tmp_name']);
    // Decode the string as a JSON array
    $numbers = json_decode($fileContents);
    // Send the array as a JSON response
    echo json_encode($numbers);
}
