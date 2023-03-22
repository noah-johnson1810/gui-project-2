const newButton = document.getElementById("new-button");
const blueEggButton = document.getElementById("blue-egg-button");
const bunnyButton = document.getElementById("bunny-button");
const whiteBasketButton = document.getElementById("white-basket-button");
const brownBasketButton = document.getElementById("brown-basket-button");
const baseButton = document.getElementById("base-button");
const allEggsButton = document.getElementById("all-eggs-button");
const mixedButton = document.getElementById("mixed-button");
const removeButton = document.getElementById("remove-button");
const stripedEggButton = document.getElementById("striped-egg-button");
const confirmButton = document.getElementById("confirm-button");
const undoButton = document.getElementById("undo-button");
const redoButton = document.getElementById("redo-button");
const saveButton = document.getElementById("save-button");


const basket = new EasterBasket();
const caretaker = new Caretaker();


newButton.addEventListener("click", function () {
  handleNewButton();
})

brownBasketButton.addEventListener("click", function () {
  basket.setBasketColor(basket.brownBasketString);
  caretaker.saveBasket(basket.getBasketArray());
})

whiteBasketButton.addEventListener("click", function () {
  basket.setBasketColor(basket.whiteBasketString);
  caretaker.saveBasket(basket.getBasketArray());
})

removeButton.addEventListener("click", function () {
  basket.removeLastEgg();
  caretaker.saveBasket(basket.getBasketArray());
})

baseButton.addEventListener("click", function () {
  basket.resetToBase();
  caretaker.saveBasket(basket.getBasketArray());
})

allEggsButton.addEventListener("click", function() {
  basket.resetAllEggs();
  handleNewButton();
})

mixedButton.addEventListener("click", function() {
  basket.resetMixedBasket();
  handleNewButton();
})

bunnyButton.addEventListener("click", function() {
  if(basket.currentCol >= 0)
    basket.setEgg(basket.chocolateBunnyString, basket.currentRow, basket.currentCol);
})

blueEggButton.addEventListener("click", function() {
  if(basket.currentCol >= 0)
    basket.setEgg(basket.blueEggString, basket.currentRow, basket.currentCol);
})

stripedEggButton.addEventListener("click", function() {
  if(basket.currentCol >= 0)
    basket.setEgg(basket.stripedEggString, basket.currentRow, basket.currentCol);
})

confirmButton.addEventListener("click", function() {
  handleConfirmButton();
})

undoButton.addEventListener("click", function() {
  handleUndo();
})

redoButton.addEventListener("click", function() {
  handleRedo();
})

saveButton.addEventListener("click", function() {
  writeBasketToServer();
})

document.getElementById("file-management-button").addEventListener("click", function(event) {
  event.preventDefault();
  setCookiePHP("0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0");
  window.location.href = "/file-management.html";
});

showPrimaryButtons();
function handleNewButton() {
  basket.currentCol++;
  if (basket.currentCol === 6) {
    if (basket.currentRow === 1) {
      basket.currentRow--;
      basket.currentCol = 0;
    }
    else {
      basket.currentCol--;
      return;
    }
  }
  basket.setEgg(basket.whiteEggString, basket.currentRow, basket.currentCol);
  showSecondaryButtons();
}

function handleConfirmButton() {
  if(basket.eggGrid.children[6 * basket.currentRow + basket.currentCol].src.includes(basket.whiteEggString)) {
    return;
  }
  caretaker.saveBasket(basket.getBasketArray());
  showPrimaryButtons();
}

function handleUndo() {
  const previousBasket = caretaker.undo();
  if (previousBasket) {
    basket.loadBasket(previousBasket);
  }
}

function handleRedo() {
  const nextBasket = caretaker.redo();
  if(nextBasket) {
    basket.loadBasket(nextBasket);
  }
}

function writeBasketToServer() {
  const form = document.getElementById("serverForm");
  let basketArray = basket.getBasketArray();
  form.elements["saveFile"].value = JSON.stringify(basketArray);
  console.log("Writing this basket: " + form.elements["saveFile"].value);
  form.submit();
}

function getCookiePHP(callback) {
  // Create an XMLHttpRequest object
  let xhttp = new XMLHttpRequest();

  // Define the PHP script that retrieves the cookie value
  let phpScript = "php/get-cookie.php";

  // Open a GET request to the PHP script
  xhttp.open("GET", phpScript, true);

  // Set a callback function to execute when the response is received
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Parse the cookie value as a JSON object
      if(this.responseText != null) {
        callback(stringToIntArray(this.responseText));
      }
    }
  };

  // Send the request
  xhttp.send();
}

function showSecondaryButtons(){
  document.getElementById("white-basket-button").style.display = "none";
  document.getElementById("brown-basket-button").style.display = "none";
  document.getElementById("base-button").style.display = "none";
  document.getElementById("all-eggs-button").style.display = "none";
  document.getElementById("mixed-button").style.display = "none";
  document.getElementById("remove-button").style.display = "none";
  document.getElementById("new-button").style.display = "none";
  document.getElementById("save-button").style.display = "none";
  document.getElementById("blue-egg-button").style.display = "block";
  document.getElementById("striped-egg-button").style.display = "block";
  document.getElementById("bunny-button").style.display = "block";
  document.getElementById("confirm-button").style.display = "block";
}

function showPrimaryButtons() {
  document.getElementById("white-basket-button").style.display = "block";
  document.getElementById("brown-basket-button").style.display = "block";
  document.getElementById("base-button").style.display = "block";
  document.getElementById("all-eggs-button").style.display = "block";
  document.getElementById("mixed-button").style.display = "block";
  document.getElementById("remove-button").style.display = "block";
  document.getElementById("new-button").style.display = "block";
  document.getElementById("save-button").style.display = "block";
  document.getElementById("blue-egg-button").style.display = "none";
  document.getElementById("striped-egg-button").style.display = "none";
  document.getElementById("bunny-button").style.display = "none";
  document.getElementById("confirm-button").style.display = "none";
}

function processCookie(cookieValue) {
  console.log("In function processCookie, here's the cookieValue: " + cookieValue);
  if(cookieValue.length !== 0) {
    console.log("Trying to load the basket with " + cookieValue);
    basket.loadBasket(cookieValue);
  }
}

function stringToIntArray(str) {
  return str.split(",").map(function(num) {
    return parseInt(num);
  });
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



// Call the getCookiePHP function and pass in the processCookie function as a callback
getCookiePHP(processCookie);
