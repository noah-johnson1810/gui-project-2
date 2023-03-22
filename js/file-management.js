const downloadButton = document.getElementById("download-basket-button");
const uploadButton = document.getElementById("upload-basket-button");
const openButton = document.getElementById("open-basket-button");

downloadButton.addEventListener("click", function() {
  writeBasketToServer();
})

uploadButton.addEventListener("click", function() {
  loadFile();
})

openButton.addEventListener("click", function() {
  setCookiePHP(availableBasket.arr);
  window.location.href = "http://localhost";
})

let availableBasket = {
  name: "",
  arr: []
};

function setAvailableBasket(newName, newArr) {
  console.log("Setting available basket to " + newArr + " with the name " + newName);
  availableBasket = {
    name: newName,
    arr: newArr
  };
  document.getElementById("open-basket-description").innerText = newName;
}

function stringToIntArray(str) {
  const arr = JSON.parse(str);
  return arr.map((element) => parseInt(element));
}

function setCookiePHP(arrayToSave) {
  // Create an XMLHttpRequest object
  let xhttp = new XMLHttpRequest();

  // Define the PHP script that sets the cookie
  let phpScript = "php/save-cookie.php";

  // Set the parameters to pass to the PHP script
  let params = "cookieName=basket&cookieValue=" + arrayToSave;

  // Open a POST request to the PHP script
  xhttp.open("POST", phpScript, true);

  // Set the content type of the request
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Send the request with the parameters
  xhttp.send(params);
}

function writeBasketToServer() {
  const form = document.getElementById("serverForm");
  let basketArray = availableBasket.arr;
  form.elements["saveFile"].value = JSON.stringify(basketArray);
  console.log("Writing this basket: " + form.elements["saveFile"].value);
  form.submit();
}

function loadFile() {
  // Get the filename from the input field
  let filename = document.getElementById('filename').value;

  // Create a new XMLHttpRequest object
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      setAvailableBasket(filename, stringToIntArray(this.responseText));
    }
  };
  xhttp.open("GET", "php/" + filename, true);
  xhttp.send();
}
