/* Author: Noah Johnson
 * Class: CSC 468
 * Description: The JS helper methods for the file management page
 */


// declare a few constants which are locating elements in the DOM
const downloadButton = document.getElementById("download-basket-button");
const uploadButton = document.getElementById("upload-basket-button");
const openButton = document.getElementById("open-basket-button");


// initialize availableBasket
let availableBasket = {
  name: "",
  arr: []
};


/* EVENT LISTENERS */

/* Description: links the download button to the function "writeBasketToServer()"
 */
downloadButton.addEventListener("click", function() {
  writeBasketToServer();
})

/* Description: links the open button to the function "setCookiePHP" and redirects to main page
 */
openButton.addEventListener("click", function() {
  setCookiePHP(availableBasket.arr);
  window.location.href = "http://localhost";
})

/* Description: links the upload button to the function "loadFile()"
 */
uploadButton.addEventListener("click", function() {
  loadFile();
})


/* UTILITY FUNCTIONS */

/* Description: loads the file from the PHP server
 */
function loadFile() {
  // get the filename from the input field
  let filename = document.getElementById('filename').value;

  // create ne xhttp object
  let xhttp = new XMLHttpRequest();

  // set the available basket to be what is in the server file
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      setAvailableBasket(filename, stringToIntArray(this.responseText));
    }
  };
  xhttp.open("GET", "php/" + filename, true);
  xhttp.send();
}

/* Description: sets the name and array of the "available" basket in the server upload area
 */
function setAvailableBasket(newName, newArr) {
  // set available basket properties and innerText
  availableBasket = {
    name: newName,
    arr: newArr
  };
  document.getElementById("open-basket-description").innerText = newName;
}

/* Description: converts string array to javascript array
 */
function stringToIntArray(str) {
  const arr = JSON.parse(str);
  return arr.map((element) => parseInt(element));
}

/* Description: takes in an array and sets it in the PHP cookies
 * Parameters: arrayToSave - the array to be added to PHP cookies
 */
function setCookiePHP(arrayToSave) {

  // create new xhttp request object
  let xhttp = new XMLHttpRequest();

  // define the script that sets the cookie and set params
  let phpScript = "php/save-cookie.php";
  let params = "cookieName=basket&cookieValue=" + arrayToSave;

  // send a post request to the PHP script
  xhttp.open("POST", phpScript, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}

/* Description: writes the current basket to the server through the "serverForm" on the DOM
 */
function writeBasketToServer() {
  // locate server writing for
  const form = document.getElementById("serverForm");

  // set basket array to the available basket
  let basketArray = availableBasket.arr;
  form.elements["saveFile"].value = JSON.stringify(basketArray);
  form.submit();
}
