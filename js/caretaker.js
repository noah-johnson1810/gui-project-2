/* Author: Noah Johnson
 * Class: CSC 468
 * Description: Caretaker class for Undo/Redo
 */

class Caretaker { // GRADING: MANAGE

  /* Description: Constructor for caretaker, initializes baskets array to the starting empty brown basket
   */
  constructor() {
    const startingBasket = new EasterBasketMemento([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    this.baskets = [startingBasket];
    this.currentBasket = 0;
  }

  /* Description: Performs a redo by incrementing the index of the "current" basket in the history array
   * Returns: the new current basket
   */
  redo() {
    // check to make sure there are baskets in the history
    if (this.currentBasket < this.baskets.length - 1) {
      // increment current basket
      this.currentBasket++;
      return this.baskets[this.currentBasket].getBasket();
    }
  }

  /* Description: adds a basket to the caretaker's history array
   * Parameters: basket - the basket to save
   */
  saveBasket(basket) {
    this.baskets.push(new EasterBasketMemento(basket));
    this.currentBasket = this.baskets.length - 1;
  }

  /* Description: Performs an undo by decrementing the index of the "current" basket in the history array
   * Returns: the new current basket
   */
  undo() {
    if (this.currentBasket >= 0) {
      this.currentBasket--;
      return this.baskets[this.currentBasket].getBasket();
    }
  }
}
