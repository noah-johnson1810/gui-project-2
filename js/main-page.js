/* Author: Noah Johnson
 * Class: CSC 468
 * Description: The javascript for the main (index) page of the easter basket application
 */


// set constants which are locating elements in the DOM
const newButton = document.getElementById("new-button");
const blueEggButton = document.getElementById("blue-egg-button");
const bunnyButton = document.getElementById("bunny-button");
const whiteBasketButton = document.getElementById("white-basket-button");
const brownBasketButton = document.getElementById("brown-basket-button");
const blueBasketButton = document.getElementById("blue-basket-button");
const greenBasketButton = document.getElementById("green-basket-button");
const redBasketButton = document.getElementById("red-basket-button");
const baseButton = document.getElementById("base-button");
const allEggsButton = document.getElementById("all-eggs-button");
const mixedButton = document.getElementById("mixed-button");
const removeButton = document.getElementById("remove-button");
const stripedEggButton = document.getElementById("striped-egg-button");
const confirmButton = document.getElementById("confirm-button");
const undoButton = document.getElementById("undo-button");
const redoButton = document.getElementById("redo-button");
const saveButton = document.getElementById("save-button");
const deleteRowButton = document.getElementById("delete-row-button");
const changeBasketButton = document.getElementById("change-basket-button");

// initialize basket and caretaker
const basket = new EasterBasket();
const caretaker = new Caretaker();

/* EVENT LISTENERS */

/* Description: event listener to link the brown basket button to the appropriate methods
 */
brownBasketButton.addEventListener("click", function () {
  // set basket color
  basket.setBasketColor(basket.brownBasketString);
  // save action for undo/redo
  caretaker.saveBasket(basket.getBasketArray());
  // show appropriate buttons
  showPrimaryButtons();
})

/* Description: event listener to link the New button to the handleNewButton() function
 */
newButton.addEventListener("click", function () {
  handleNewButton();
})

/* Description: event listener to link the blue basket button to the appropriate methods
 */
blueBasketButton.addEventListener("click", function() {
  // set basket color
  basket.setBasketColor(basket.blueBasketString)
  // save action for undo/redo
  caretaker.saveBasket(basket.getBasketArray());
  // show appropriate buttons
  showPrimaryButtons();
})

/* Description: event listener to link the red basket button to the appropriate methods
 */
redBasketButton.addEventListener("click", function() {
  // set basket color
  basket.setBasketColor(basket.redBasketString)
  // save action for undo/redo
  caretaker.saveBasket(basket.getBasketArray());
  // show appropriate buttons
  showPrimaryButtons();
})

/* Description: event listener to link the green basket button to the appropriate methods
 */
greenBasketButton.addEventListener("click", function() {
  // set basket color
  basket.setBasketColor(basket.greenBasketString)
  // save action for undo/redo
  caretaker.saveBasket(basket.getBasketArray());
  // show appropriate buttons
  showPrimaryButtons();
})

/* Description: event listener to link the remove button to the appropriate methods
 */
removeButton.addEventListener("click", function () {
  // remove last egg
  basket.removeLastEgg();
  // save state for undo/redo
  caretaker.saveBasket(basket.getBasketArray());
})

/* Description: event listener to link the base button to the appropriate methods
 */
baseButton.addEventListener("click", function () {
  // reset to base
  basket.resetToBase();
  // save state for undo / redo
  caretaker.saveBasket(basket.getBasketArray());
})

/* Description: event listener to link the all Eggs button to the appropriate methods
 */
allEggsButton.addEventListener("click", function() {
  // reset first
  basket.resetAllEggs();
  // link to handleNewButton method
  handleNewButton();
})

/* Description: event listener to link the mixed button to the appropriate methods
 */
mixedButton.addEventListener("click", function() {
  // reset mixed basket
  basket.resetMixedBasket();
  // link to handleNewButton method
  handleNewButton();
})

/* Description: event listener to link the bunny Button to the appropriate methods
 */
bunnyButton.addEventListener("click", function() {
  // set bunny
  if(basket.currentCol >= 0)
    basket.setEgg(basket.chocolateBunnyString, basket.currentRow, basket.currentCol);
})

/* Description: event listener to link the blue egg button to the appropriate methods
 */
blueEggButton.addEventListener("click", function() {
  // set egg
  if(basket.currentCol >= 0)
    basket.setEgg(basket.blueEggString, basket.currentRow, basket.currentCol);
})

/* Description: event listener to link the striped egg button to the appropriate methods
 */
stripedEggButton.addEventListener("click", function() {
  // set striped egg
  if(basket.currentCol >= 0)
    basket.setEgg(basket.stripedEggString, basket.currentRow, basket.currentCol);
})

/* Description: event listener to link the confirm button to the appropriate methods
 */
confirmButton.addEventListener("click", function() {
  handleConfirmButton();
})

/* Description: event listener to link the undo button to the appropriate methods
 */
undoButton.addEventListener("click", function() {
  handleUndo();
})

/* Description: event listener to link the redo button to the appropriate methods
 */
redoButton.addEventListener("click", function() {
  handleRedo();
})

/* Description: event listener to link the save button to the appropriate methods
 */
saveButton.addEventListener("click", function() {
  // set cookie
  setCookiePHP(basket.getBasketArray());
  // write basket
  writeBasketToServer();
})

/* Description: event listener to link the delete row button to the appropriate methods
 */
deleteRowButton.addEventListener("click", function() {
  basket.deleteCurrentRow();
})

/* Description: event listener to link the file management button to the appropriate methods
 */
document.getElementById("file-management-button").addEventListener("click", function(event) {
  // wait to follow anchor link
  event.preventDefault();
  // set cookie
  setCookiePHP("0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0");
  // redirect
  window.location.href = "/file-management.html";
});

/* Description: event listener to link the change basket button to the appropriate methods
 */
changeBasketButton.addEventListener("click", function() {
  showBasketButtons();
})

/* Description: event listener to link the white basket button to the appropriate methods
 */
whiteBasketButton.addEventListener("click", function () {
  // set basket color
  basket.setBasketColor(basket.whiteBasketString);
  // save action for undo/redo
  caretaker.saveBasket(basket.getBasketArray());
  // show appropriate buttons
  showPrimaryButtons();
})

// show primary buttons
showPrimaryButtons();


/* FUNCTIONS */

/* Description: gets cookie from PHP
 */
function getCookiePHP(callback) {
  // create an XMLHttpRequest object
  let xhttp = new XMLHttpRequest();

  // define the script and open get request
  let phpScript = "php/get-cookie.php";
  xhttp.open("GET", phpScript, true);

  // set callback function
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // parse the cookie value as a JSON object
      if(this.responseText != null) {
        callback(stringToIntArray(this.responseText));
      }
      else {
        callback([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
    }
  };
  // send the request
  xhttp.send();
}

/* Description: handler for confirm button linked to from event listener
 */
function handleConfirmButton() {
  // check for boundaries
  if(basket.eggGrid.children[6 * basket.currentRow + basket.currentCol].src.includes(basket.whiteEggString)) {
    return;
  }
  // save state
  caretaker.saveBasket(basket.getBasketArray()); // GRADING: ACTION
  // show primary buttons
  showPrimaryButtons();
}

/* Description: handler for new button linked to from event listener
 */
function handleNewButton() {
  // increment current column
  basket.currentCol++;
  // handle new row
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
  // set white placeholder egg in calculated position
  basket.setEgg(basket.whiteEggString, basket.currentRow, basket.currentCol);
  // show secondary egg selection buttons
  showSecondaryButtons();
}

/* Description: handler for redo linked from event listener
 */
function handleRedo() {
  // perform redo in caretaker
  const nextBasket = caretaker.redo();
  // load basket if not null
  if(nextBasket) {
    basket.loadBasket(nextBasket);
  }
}

/* Description: handler for undo linked from event listener
 */
function handleUndo() {
  // perform undo from caretaker
  const previousBasket = caretaker.undo();
  // load basket if not null
  if (previousBasket) {
    basket.loadBasket(previousBasket);
  }
}

/* Description: callback function to process and load basket from retrieved cookie value
 */
function processCookie(cookieValue) {
  if(cookieValue.length !== 0) {
    // load basket if cookie not empty
    basket.loadBasket(cookieValue);
  }
}

/* Description: hides the unnecessary buttons when the user is confirming an egg selection
 */
function showSecondaryButtons(){
  document.getElementById("white-basket-button").style.display = "none";
  document.getElementById("brown-basket-button").style.display = "none";
  document.getElementById("blue-basket-button").style.display = "none";
  document.getElementById("red-basket-button").style.display = "none";
  document.getElementById("green-basket-button").style.display = "none";
  document.getElementById("base-button").style.display = "none";
  document.getElementById("all-eggs-button").style.display = "none";
  document.getElementById("mixed-button").style.display = "none";
  document.getElementById("remove-button").style.display = "none";
  document.getElementById("new-button").style.display = "none";
  document.getElementById("save-button").style.display = "none";
  document.getElementById("delete-row-button").style.display = "none";
  document.getElementById("blue-egg-button").style.display = "block";
  document.getElementById("striped-egg-button").style.display = "block";
  document.getElementById("bunny-button").style.display = "block";
  document.getElementById("confirm-button").style.display = "block";
  document.getElementById("change-basket-button").style.display = "none";
}

/* Description: hides the unnecessary buttons when on the main state
 */
function showPrimaryButtons() {
  document.getElementById("white-basket-button").style.display = "none";
  document.getElementById("brown-basket-button").style.display = "none";
  document.getElementById("blue-basket-button").style.display = "none";
  document.getElementById("red-basket-button").style.display = "none";
  document.getElementById("green-basket-button").style.display = "none";
  document.getElementById("base-button").style.display = "block";
  document.getElementById("all-eggs-button").style.display = "block";
  document.getElementById("mixed-button").style.display = "block";
  document.getElementById("remove-button").style.display = "block";
  document.getElementById("new-button").style.display = "block";
  document.getElementById("save-button").style.display = "block";
  document.getElementById("delete-row-button").style.display = "block";
  document.getElementById("blue-egg-button").style.display = "none";
  document.getElementById("striped-egg-button").style.display = "none";
  document.getElementById("bunny-button").style.display = "none";
  document.getElementById("confirm-button").style.display = "none";
  document.getElementById("change-basket-button").style.display = "block";
}

/* Description: hides the unnecessary buttons when the user is selecting a basket color
 */
function showBasketButtons() {
  document.getElementById("white-basket-button").style.display = "block";
  document.getElementById("brown-basket-button").style.display = "block";
  document.getElementById("blue-basket-button").style.display = "block";
  document.getElementById("red-basket-button").style.display = "block";
  document.getElementById("green-basket-button").style.display = "block";
  document.getElementById("base-button").style.display = "none";
  document.getElementById("all-eggs-button").style.display = "none";
  document.getElementById("mixed-button").style.display = "none";
  document.getElementById("remove-button").style.display = "none";
  document.getElementById("new-button").style.display = "none";
  document.getElementById("save-button").style.display = "none";
  document.getElementById("delete-row-button").style.display = "none";
  document.getElementById("blue-egg-button").style.display = "none";
  document.getElementById("striped-egg-button").style.display = "none";
  document.getElementById("bunny-button").style.display = "none";
  document.getElementById("confirm-button").style.display = "none";
  document.getElementById("change-basket-button").style.display = "none";
}

/* Description: sets PHP cookie with the value passed in
 * Parameters: arrayToSave - the array to be saved to a cookie
 */
function setCookiePHP(arrayToSave) {
  // create an XMLHttpRequest object
  let xhttp = new XMLHttpRequest();

  // define script and set params
  let phpScript = "php/save-cookie.php";
  let params = "cookieName=basket&cookieValue=" + arrayToSave;

  // send post request
  xhttp.open("POST", phpScript, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}

/* Description: helper function to convert string to javascript array
 * Parameters: str - the string array to be converted to JS array
 * Returns: the passed in array as a javascript array
 */
function stringToIntArray(str) {
  return str.split(",").map(function(num) {
    return parseInt(num);
  });
}

/* Description: write the current basket to the PHP server
 */
function writeBasketToServer() {
  // identify server form in the DOM
  const form = document.getElementById("serverForm");
  // get basket array from easterBasket class
  let basketArray = basket.getBasketArray();
  // set form value
  form.elements["saveFile"].value = JSON.stringify(basketArray);
  // submit form
  form.submit();
}

// Call the getCookiePHP function and pass in the processCookie function as a callback
getCookiePHP(processCookie);
