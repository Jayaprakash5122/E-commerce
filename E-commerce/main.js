let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let total = 0;
let itemCount = 0;

// add to cart
function addToCart(productCard){
const name = productCard.querySelector(".product-name").textContent;
const priceText = productCard.querySelector(".product-price").textContent;
const price = parseFloat(priceText.replace("$",""))
const imgSrc= productCard.querySelector(".product-image").src;


const existingItem = cartItems.find((item) => item.name === name);
if(existingItem){
    existingItem.quantity +=1;
}else{
    cartItems.push({
        name,
        price,
        quantity:1,
        image:imgSrc,
    })
}
updateLocalStorage();
updatecartDisplay();
animateAddTocart(productCard);
}


// remove from cart
function removeItem(name){
    cartItems = cartItems.filter((item) => item.name !== name);
    updateLocalStorage();
    updatecartDisplay();
}

function animateAddTocart(element){
    const cartIcon = document.getElementById("cart-icon")
    const cartRect = cartIcon.getBoundingClientRect();
    const rect = element.getBoundingClientRect();

    const flyingItem = document.createElement("div")
       flyingItem.className = "flying-item";
       flyingItem.style.cssText = `
       position: fixed;
    z-index: 1000;
    width: 150px;
    height: 150px;
    background-image: url(${element.querySelector(".product-image").src});
    background-size: cover;
    border-radius: 50%;
    left:${rect.left}px ;
    top: ${rect.top}px;
    transition: all 2s cubic-bezier(0.19,1,0.22,1);
    pointer-events: none;
       `;

       document.body.appendChild(flyingItem)
    
setTimeout(() =>{
    flyingItem.style.transform = "scale(0.5)";
    flyingItem.style.left = `${cartRect.left + cartRect.width / 2 - 25}px`;
    flyingItem.style.top= `${cartRect.top + cartRect.height / 2 - 100}px`;
    flyingItem.style.opacity = "0";
},50);

// remove after animation
setTimeout(() =>{
    flyingItem.remove();
},1200);

}

function updatecartDisplay(){
    const cartList = document.getElementById("cart-items")
    const totalElement = document.getElementById("total-price")
    const countelement = document.getElementById("cart-count")

    cartList.innerHTML = "";
    total = cartItems.reduce((sum,item) => sum + item.price + item.quantity,0);
    itemCount = cartItems.reduce((count,item) => count + item.quantity,0);

    cartItems.forEach((item)=> {
        const li = document.createElement("li");
        li.classList = "cart-item";
        li.innerHTML =`
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
<div class="cart-item-details">
    <div class="cart-item-name">${item.name}</div>
    <div class="cart-item-price">${item.price}x${item.quantity}</div>
</div>

<div class="quantity-control">
    <button onclick="changeQuantity('${item.name}', -1)">-</button>
    <button onclick="changeQuantity('${item.name}', 1)">+</button>
</div>
<button class="remove-item" onclick="removeItem('${item.name}')">X</button>
  `;

cartList.appendChild(li)

    });
totalElement.textContent = total.toFixed(2);
countelement.textContent = itemCount;

}

function changeQuantity(name,delta){
    const item = cartItems.find((item) => item.name === name);
    if(item){
        item.quantity += delta;
        if(item.quantity <= 0){
            removeItem(name);
        }else{
            updateLocalStorage();
            updatecartDisplay();
        }
    }
}


// local storage cart page refresh
function updateLocalStorage(){
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
}

window.onload = function (){
    updatecartDisplay();
}
 


// cart open close
let cartIcon = document.querySelector(".cart-icon");
let cartModel = document.querySelector(".cart-model");
let cartClose = document.querySelector(".close-btn");

cartIcon.onclick = () =>{
    cartModel.classList.add("open-cart");
}

cartClose.onclick = () =>{
    cartModel.classList.remove("open-cart");
}

function confirmAction(){
    const result = confirm("The Products Validated");
}