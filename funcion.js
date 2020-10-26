


var button;
var imput;
var removeCartItemButtons = document.getElementsByClassName('btn-remove');
var quantityImput= document.getElementsByClassName('cart-quantity-input');
var addToCartButtons = document.getElementsByClassName('shop-item-button');


for (var i = 0; i < removeCartItemButtons.length; i++) {
    button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
}

for (var i = 0; i < quantityImput.length; i++) {
  imput = quantityImput[i];
  imput.addEventListener('change', quantityChanged);
}

for (var i = 0; i < addToCartButtons.length; i++) {
    button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
}




//FUNCIONES
$("#btnCart").click(function(){
  $("#cart").slideToggle("slow");
});

$(".burger-menu").click(function(){
  $("#info").slideToggle("slow");
  $(".title").toggle("slow");
  if($('#cart').length != 0){
    $("#cart").slideUp("slow");
  }
});

// function btnCart(){
//   cart = document.getElementById("cart");
//   cart.classList.toggle("containerCartOpen");
// }

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(title, price, imageSrc)
  activateStock()
  rotate()  
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
        document.getElementsByClassName('cart-quantity-input')[i].value++;
          return
      }
  }
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-remove" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
var cartItemContainer = document.getElementsByClassName('cart-items')[0];
var cartRows = cartItemContainer.getElementsByClassName('cart-row');
var total = 0;
for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    total = total + (price * quantity);    
 }
total = Math.round(total * 100) / 100;
document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
if(total==0)
{
  stock = document.getElementById("stock");
  stock.classList.remove("stock");
}
}

function purchase(){
  alert("gracias por la compra");
}

function activateStock(){
  stock = document.getElementById("stock");
  stock.classList.add("stock");  
}
function rotate(){
  cart = document.getElementById("btnCart");
  cart.classList.toggle("rotate");
}

//SLIDES//

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}