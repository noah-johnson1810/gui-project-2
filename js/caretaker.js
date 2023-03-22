class Caretaker {
  constructor() {
    this.baskets = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.currentBasket = 0;
  }

  saveBasket(basket) {
    this.baskets.push(basket);
    this.currentBasket = this.baskets.length - 1;
  }

  undo() {
    if (this.currentBasket >= 0) {
      this.currentBasket--;
      return this.baskets[this.currentBasket];
    }
  }

  redo() {
    if(this.currentBasket < this.baskets.length - 1) {
      this.currentBasket++;
      return this.baskets[this.currentBasket];
    }
  }
}
