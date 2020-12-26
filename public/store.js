console.log('store.js is running')

// checks if all the DOM contents are loaded and if they are load the function "ready"
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
    console.log('test')
}
else{
    ready()
    console.log('else test')
}


// continually checks the various buttons, quantity inputs if there any changes and if there are runs the respective functions
function ready(){
    console.log('page has loaded')
    var removeCartItems = document.getElementsByClassName("btn-remove");
    for (var i=0; i<removeCartItems.length; i++){
        var button = removeCartItems[i];
        button.addEventListener("click", removeCartItem)
    }
    
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i=0; i<quantityInputs.length; i++){
        var quantityInput = quantityInputs[i];
        quantityInput.addEventListener("change", updateQuantity)
    }

    var addToCartButtons = document.getElementsByClassName("btn-item");
    for (var i=0; i<addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener("click", addtoCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

}


// consequence of the "click" event to the bt-remove
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCart();
}

// consequence of the "change" event to the cart-quantity
function updateQuantity(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    console.log('change event triggered');
    updateCart();
}

// const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [{
//       price_data: {
//         product: '{{PRODUCT_ID}}',
//         unit_amount: 1500,
//         currency: 'usd',
//       },
//       quantity: 1,
//     }],
//     mode: 'payment',
//     success_url: 'https://example.com/success',
//     cancel_url: 'https://example.com/cancel',
//   });
  


// consequence of the "click" event to the btn-purchase
function purchaseClicked(){
    var priceElement = document.getElementsByClassName("cart-total-price")[0]
    var price = parseFloat(priceElement.innerText.replace('$','')) * 100 //stripe expects value to be in cents
    console.log('button was clicked')

//     alert('Thank you for your purchase.')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     while (cartItems.hasChildNodes()){
//         cartItems.removeChild(cartItems.firstChild);
//     }
//     document.getElementsByClassName("cart-total-price")[0].innerText = '$' + 0.00;
}


// consequence of the "click" event to the btn-item

function addtoCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var itemName = shopItem.getElementsByClassName("item-name")[0].innerText;
    var itemPrice = shopItem.getElementsByClassName("item-price")[0].innerText;
    var itemImgSrc = shopItem.getElementsByClassName("item-image")[0].src;
    addtoCartItems(itemName, itemPrice, itemImgSrc);
    updateCart();
}

// creates a new row from the passed elements from the "click" events to the btn-item
 function addtoCartItems(itemName,itemPrice,itemImgSrc){
    var cartRow = document.createElement('div');
    cartRow.classList.add("cart-row")
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = document.getElementsByClassName('cart-item-name');
    for (var i=0; i<cartItemNames.length; i++){
        if (cartItemNames[i].innerText == itemName){
           alert("This item is already added to the cart.");
           return;
       }
    }

    var cartRowContents = 
    `
    <div class="grid md:grid-cols-2 items-center grid-row">
        <img class="hidden sm:grid cart-image pr-2" src="${itemImgSrc}">
        <span class="cart-item-name font-bold text-sm text-gray-600"> ${itemName} </span>
    </div>
    <span class="cart-price"> ${itemPrice} </span>
    <div class="grid grid-cols-2 items-center col-start-3 col-span-2">
        <input class="cart-quantity border-2 border-gray-400 border-opacity-50 w-8 text-center justify-self-end"    type="number" value="1" name="" id="item1Quantity">
        <button class="btn-remove" type="button"> REMOVE </button>
    </div>
    `
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change',updateQuantity)


}



// computes total price of items inside card
function updateCart (){
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var totalCartValue = 0;
    for (var i=0; i<cartRows.length; i++){

        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity")[0];
    

        var price = parseFloat(priceElement.innerText.replace('$',''));
        var quantity = quantityElement.value;

        totalCartValue = totalCartValue + (price * quantity);
    }  
    totalCartValue = Math.round(totalCartValue *100)/100;
    document.getElementsByClassName("cart-total-price")[0].innerText = '$' + totalCartValue;
}

