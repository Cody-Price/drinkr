var nameInput = document.querySelector('.form-name--input');
var priceInput = document.querySelector('.form-price--input');
var abvInput = document.querySelector('.form-abv--input');
var volumeInput = document.querySelector('.form-volume--input');
var taxInput = document.querySelector('.form-tax--input');
var submitBtn = document.querySelector('.submit-btn');
var domList = document.querySelector('.dom-list');
var beerNum = 0;

function calc() {
  if (domList.children.length < 4) {
  beerNum++;
  name = nameInput.value || beerNum;
  price = parseInt(priceInput.value);
  abv = parseInt(abvInput.value);
  volume = parseInt(abvInput.value);
  tax = taxInput.value || 1;
  totalOzAlcohol = (abv * 0.01) * volume;
  totalPrice = price * tax;
  alcoholPerDollar = totalOzAlcohol / totalPrice;
  card = new Card(name, totalPrice, totalOzAlcohol, alcoholPerDollar);
  domList.append(card);
  clearInputs();
  priceInput.focus();
  };
};

function clearInputs() {
  nameInput.value = '';
  priceInput.value = '';
  abvInput.value = '';
  volumeInput.value = '';
  taxInput.value = '';
};

submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  calc();
});

domList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentNode.remove();
  }
})

function Card(name, totalPrice, ozAlc, alcoholPerDollar) {
  this.name = name;
  this.totalPrice = totalPrice.toFixed(2);
  this.ozAlc = ozAlc.toFixed(1);
  this.alcoholPerDollar = alcoholPerDollar.toFixed(1);
  this.li = document.createElement('li');
  this.li.innerHTML = `Drink: ${this.name}<br>
                       Total Price: $${this.totalPrice}<br>
                       Total oz pure alcohol: ${this.ozAlc}Oz<br>
                       Oz pure alcohol/dollar: ${this.alcoholPerDollar}<br>
                       <button class="delete-btn">Delete Drink</button>`
  return this.li;
};