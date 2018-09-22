// document.addEventListener("DOMContentLoaded", function(event) { 
//   getStorage();
// });

var nameInput = document.querySelector('.form-name--input');
var priceInput = document.querySelector('.form-price--input');
var abvInput = document.querySelector('.form-abv--input');
var volumeInput = document.querySelector('.form-volume--input');
var taxInput = document.querySelector('.form-tax--input');
var submitBtn = document.querySelector('.submit-btn');
var domList = document.querySelector('.dom-list');
var drinkNum = 0;

nameInput.addEventListener('keyup', function() {
  checkInputs();
});

priceInput.addEventListener('keyup', function() {
  checkInputs();
});

abvInput.addEventListener('keyup', function() {
  checkInputs();
});

volumeInput.addEventListener('keyup', function() {
  checkInputs();
});

taxInput.addEventListener('keyup', function() {
  checkInputs();
});

function calc() {
  if (domList.children.length < 4) {
  drinkNum++;
  name = nameInput.value || drinkNum;
  price = parseFloat(priceInput.value);
  abv = parseFloat(abvInput.value);
  volume = parseFloat(volumeInput.value);
  tax = parseFloat(taxInput.value * 0.01) || 1;
  totalOzAlcohol = (abv * 0.01) * volume;
  totalPrice = calcPrice();
  alcoholPerDollar = totalOzAlcohol / totalPrice;
  card = new Card(name, totalPrice, totalOzAlcohol, alcoholPerDollar);
  domList.append(card.li);
  storeDrink(card);
  clearInputs();
  priceInput.focus();
  submitBtn.setAttribute('disabled', '');
  };
};

function storeDrink(card) {
  var stringyCard = JSON.stringify(card);
  localStorage.setItem(card.name, stringyCard);
};

// function getStorage() {
//   getCard = localStorage.getItem(card) {
//   var renderedCard = JSON.parse(getCard);
//   domList.append(renderedCard);
// }

function calcPrice() {
  if (tax === 1) {
    return price;
  } else {
    return price + price * tax;
  };
};

function checkInputs() {
  if (priceInput.value === '' || abvInput.value === '' || volumeInput.value === '') {
    submitBtn.setAttribute('disabled', '');
  } else {
    submitBtn.removeAttribute('disabled', '');
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
  this.ozAlc = ozAlc.toFixed(2);
  this.alcoholPerDollar = alcoholPerDollar.toFixed(2);
  this.li = document.createElement('li');
  this.li.innerHTML = `Drink: ${this.name}<br>
                       Total Price: $${this.totalPrice}<br>
                       Total oz pure alcohol: ${this.ozAlc}oz<br>
                       ${this.alcoholPerDollar} oz/$<br>
                       <button class="delete-btn">Delete Drink</button>`
};