class EasterBasket {
  constructor() {
    console.log("TEST");
    this.currentCol = -1;
    this.currentRow = 1;

    this.eggGrid = document.getElementById("egg-grid");
    this.basket = document.getElementById("basket");

    this.whiteEggString = "Images/white_egg.png";
    this.stripedEggString = "Images/stripe_egg.png";
    this.blueEggString = "Images/blue_egg.png";
    this.brownBasketString = "Images/brown_basket.png";
    this.whiteBasketString = "Images/white_basket.png";
    this.chocolateBunnyString = "Images/chocolate_bunny.png";

    this.eggDictionary = {
      0: "",
      1: this.whiteEggString,
      2: this.blueEggString,
      3: this.stripedEggString,
      4: this.chocolateBunnyString,
    };

    this.basketDictionary = {
      0: this.brownBasketString,
      1: this.whiteBasketString,
    };
  }

  setBasketColor(basketType) {
    const newBasket = document.createElement("img");
    newBasket.src = basketType;
    this.basket.replaceChildren(newBasket);
  }

  setEgg(eggType, row, col) {
    if (this.currentRow === 0 && this.currentCol === 6) return;
    const index = 6 * row + col;
    const newImage = document.createElement("img");
    newImage.src = eggType;
    this.eggGrid.replaceChild(newImage, this.eggGrid.children[index]);
  }

  removeLastEgg() {
    const index = 6 * this.currentRow + this.currentCol;
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
      // bottom row
      if (this.currentCol > -1)
        // ignore remove on empty basket
        this.currentCol--;
    }
  }

  loadBasket(basket) {
    for (let i = 0; i < 6; i++) {
      this.setEgg(this.eggDictionary[basket[i]], 1, i);
      this.setEgg(this.eggDictionary[basket[6 + i]], 0, i);
    }
    this.setBasketColor(this.basketDictionary[basket[12]]);
    this.setCookie(basket);
  }

  resetToBase() {
    let emptyBasket = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.loadBasket(emptyBasket);
  }

  resetAllEggs() {
    let allEggsBasket = [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0];
    this.loadBasket(allEggsBasket);
    this.currentCol = 4;
    this.currentRow = 1;
  }

  resetMixedBasket() {
    let mixedBasket = [2, 3, 2, 3, 2, 3, 4, 4, 4, 0, 0, 0, 1];
    this.setBasketColor(this.whiteBasketString);
    this.loadBasket(mixedBasket);
    this.currentCol = 2;
    this.currentRow = 0;
  }

  getBasketArray() {
    let currentBasket = [];
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
    if (this.basket.children[0].src.includes(this.brownBasketString)) {
      currentBasket.push(0);
    } else if (this.basket.children[0].src.includes(this.whiteBasketString)) {
      currentBasket.push(1);
    }
    return currentBasket;
  }

  setCookie(arrayToSet) {
    document.cookie = "basketArray=" + arrayToSet;
  }
}
