/* Author: Noah Johnson
 * Class: CSC 468
 * Description: Easter basket management class. Contains helper functions for use by the main page specific to easter
 *              basket management.
 */

class EasterBasket {

  /* Description: Constructor for the easter baskets. Sets the initial grid and basket elements, and initizliaes the
   * basket strings used by the methods.
   *
   */
  constructor() {

    // initialize currentCol and currentRow
    this.currentCol = -1;
    this.currentRow = 1;

    // locate eggGrid and basket in the DOM
    this.eggGrid = document.getElementById("egg-grid");
    this.basket = document.getElementById("basket");

    // initialize strings for use in helper methods
    this.whiteEggString = "Images/white_egg.png";
    this.stripedEggString = "Images/stripe_egg.png";
    this.blueEggString = "Images/blue_egg.png";
    this.brownBasketString = "Images/brown_basket.png";
    this.whiteBasketString = "Images/white_basket.png";
    this.chocolateBunnyString = "Images/chocolate_bunny.png";
    this.blueBasketString = "Images/blue_basket.png";
    this.redBasketString = "Images/red_basket.png";
    this.greenBasketString = "Images/green_basket.png";

    // initialize dictionary to convert from array to goodies
    this.eggDictionary = {
      0: "",
      1: this.whiteEggString,
      2: this.blueEggString,
      3: this.stripedEggString,
      4: this.chocolateBunnyString,
    };

    // initialize dictionary to convert from array to basket types
    this.basketDictionary = {
      0: this.brownBasketString,
      1: this.whiteBasketString,
      2: this.blueBasketString,
      3: this.redBasketString,
      4: this.greenBasketString
    };
  }

  /* Description: deletes the current row of by calling removeLastEgg until the row is all gone
   */
  deleteCurrentRow() {
    for (let i = this.currentCol % 6; i >= 0; i--)
      this.removeLastEgg();
  }

  /* Description: gets the current basket array
   * Returns: the current basket array
   */
  getBasketArray() {
    // initialize empty basket
    let currentBasket = [];

    // push the correct number for each column of the lower row
    for (let i = 6; i < 12; i++) {
      if (this.eggGrid.children[i].src.includes(this.blueEggString))
        currentBasket.push(2);
      else if (this.eggGrid.children[i].src.includes(this.stripedEggString))
        currentBasket.push(3);
      else if (this.eggGrid.children[i].src.includes(this.chocolateBunnyString))
        currentBasket.push(4);
      else {
        currentBasket.push(0);
      }
    }

    // push the correct number for each column of the upper row
    for (let i = 0; i < 6; i++) {
      if (this.eggGrid.children[i].src.includes(this.blueEggString))
        currentBasket.push(2);
      else if (this.eggGrid.children[i].src.includes(this.stripedEggString))
        currentBasket.push(3);
      else if (this.eggGrid.children[i].src.includes(this.chocolateBunnyString))
        currentBasket.push(4);
      else {
        currentBasket.push(0);
      }
    }

    // push the correct number based on the basket color
    if (this.basket.children[0].src.includes(this.brownBasketString)) {
      currentBasket.push(0);
    } else if (this.basket.children[0].src.includes(this.whiteBasketString)) {
      currentBasket.push(1);
    } else if (this.basket.children[0].src.includes(this.blueBasketString)) {
      currentBasket.push(2);
    } else if (this.basket.children[0].src.includes(this.redBasketString)) {
      currentBasket.push(3);
    } else if (this.basket.children[0].src.includes(this.greenBasketString)) {
      currentBasket.push(4);
    }

    // return completed basket
    return currentBasket;
  }

  /* Description: sets the current basket to be the one passed in as a parameter to this method
   * Returns: the current basket array
   */
  loadBasket(basket) {
    for (let i = 0; i < 6; i++) {
      this.setEgg(this.eggDictionary[basket[i]], 1, i);
      this.setEgg(this.eggDictionary[basket[6 + i]], 0, i);
    }
    this.setBasketColor(this.basketDictionary[basket[12]]);
    let index = 11;
    while (basket[index] === 0)
      index--;
    this.currentCol = index % 6;
    this.currentRow = index > 5 ? 0 : 1;
  }

  /* Description: removes the most recently placed egg in the basket
   */
  removeLastEgg() {

    // get index of last egg
    const index = 6 * this.currentRow + this.currentCol;

    // create new empty image
    const newImage = document.createElement("img");
    newImage.src = "";
    this.eggGrid.replaceChild(newImage, this.eggGrid.children[index]);
    if (this.currentRow === 0) {
      // top row
      if (this.currentCol === 0) {
        this.currentCol = 5;
        this.currentRow = 1;
      } else this.currentCol--;
    } else {
      // bottom row, ignore remove on empty basket
      if (this.currentCol > -1)
        this.currentCol--;
    }
  }

  /* Description: the preset for "base" which is no eggs and brown basket
   */
  resetToBase() {
    let emptyBasket = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.loadBasket(emptyBasket);
  }

  /* Description: the preset for "all eggs", loads it into the basket and sets the correct new row and column
   */
  resetAllEggs() {
    // create basket
    let allEggsBasket = [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0];
    // load basket
    this.loadBasket(allEggsBasket);

    // set row and column
    this.currentCol = 4;
    this.currentRow = 1;
  }

  /* Description: the preset for "mixed", loads it into the basket and sets the row and column
   */
  resetMixedBasket() {
    // create basket
    let mixedBasket = [2, 3, 2, 3, 2, 3, 4, 4, 4, 0, 0, 0, 1];

    // load basket and color
    this.setBasketColor(this.whiteBasketString);
    this.loadBasket(mixedBasket);

    // set row and column
    this.currentCol = 2;
    this.currentRow = 0;
  }

  /* Description: sets the basket color
   */
  setBasketColor(basketType) {
    // create basket
    const newBasket = document.createElement("img");
    // set source
    newBasket.src = basketType;
    // replace basket
    this.basket.replaceChildren(newBasket);
  }

  /* Description: sets a specific egg item at the given row and column
   */
  setEgg(eggType, row, col) {
    // boundary check
    if (this.currentRow === 0 && this.currentCol === 6) return;

    // calculate index
    const index = 6 * row + col;

    // set new image
    const newImage = document.createElement("img");
    newImage.src = eggType;
    this.eggGrid.replaceChild(newImage, this.eggGrid.children[index]);
  }
}
