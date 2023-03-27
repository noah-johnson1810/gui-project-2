/* Author: Noah Johnson
 * Class: CSC 468
 * Description: Memento class for undo/redo
 */

class EasterBasketMemento { // GRADING: COMMAND

  /* Description: constructor for Memento
   * Parameters: basket - the basket to save in this memento
   */
  constructor(basket) {
    this.basket = basket;
  }

  /* Description: gets the basket from this memento
   * Returns: The basket that is contains in this memento
   */
  getBasket() {
    return this.basket;
  }
}
