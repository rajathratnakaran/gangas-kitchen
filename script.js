const CONFIG = {

scriptUrl:
"https://script.google.com/macros/s/AKfycbyrOiVZ69q9a2irSWszN3m03Qn_MCybexK6AkvqF6gntAWEnpsl2XsphttDTWt5P-CHIQ/exec",

sundayComboPrice: 169,
familyComboPrice: 329,

items: {

Poori: {
price: 10,
image: "images/poori.png"
},

Channa: {
price: 69,
image: "images/channa.png"
},

Idli: {
price: 10,
image: "images/idli.png"
},

Sambar: {
price: 39,
image: "images/sambar.png"
}

}

};

const cart = {};

const menuContainer =
document.getElementById("menuContainer");

if(menuContainer){
buildMenu();
updateCart();
}

function buildMenu(){

let html = "";

Object.keys(CONFIG.items).forEach(item => {

html += `

<div class="menu-item">

<div class="item-left">

<img
src="${CONFIG.items[item].image}"
alt="${item}">

<div>

<div class="item-name">
${item}
</div>

<div class="item-price">
₹${CONFIG.items[item].price}
</div>

</div>

</div>

<div class="qty">

<button
onclick="changeQty('${item}',-1)">
-

</button>

<span id="${item}Qty">
0
</span>

<button
onclick="changeQty('${item}',1)">
+ </button>

</div>

</div>
`;

});

menuContainer.innerHTML = html;

}

function addCombo(name, button){

if(cart[name]){
    cart[name] = 0;

    button.innerHTML = "Add Combo";
    button.style.background = "";
}
else{
    cart[name] = 1;

    button.innerHTML = "✓ Added";
    button.style.background = "#214D36";
}

updateCart();

}

function changeQty(item,change){

cart[item] =
(cart[item] || 0) + change;

if(cart[item] < 0){
cart[item] = 0;
}

const qtyElement =
document.getElementById(
item + "Qty"
);

if(qtyElement){
qtyElement.innerText =
cart[item];
}

updateCart();

}

function updateCart(){

let total = 0;
let html = "";

Object.keys(cart).forEach(item => {

if(cart[item] <= 0){
return;
}

html +=
`${item} x ${cart[item]}<br>`;

if(item === "Sunday Combo"){

total +=
cart[item] *
CONFIG.sundayComboPrice;

}

else if(item === "Family Combo"){

total +=
cart[item] *
CONFIG.familyComboPrice;

}

else{

total +=
cart[item] *
CONFIG.items[item].price;

}

});

if(html === ""){
html = "No items yet";
}

document.getElementById("cart")
.innerHTML = html;

document.getElementById("total")
.innerText = "₹" + total;

const hasItems =
Object.values(cart)
.some(qty => qty > 0);

const placeOrderBtn =
document.getElementById(
"placeOrderBtn"
);

if(placeOrderBtn){

placeOrderBtn.disabled =
!hasItems;

}

}

async function placeOrder(){

const name =
document.getElementById("name")
.value.trim();

const phone =
document.getElementById("phone")
.value.trim();

const apartment =
document.getElementById("apartment")
.value.trim();

const flat =
document.getElementById("flat")
.value.trim();

const notes =
document.getElementById("notes")
.value.trim();

const order =
document.getElementById("cart")
.innerText;

const total =
document.getElementById("total")
.innerText;

if(order === "No items yet"){

alert(
"Please add at least one item."
);

return;

}

if(!name || !phone){

alert(
"Name and Phone are required."
);

return;

}

const placeOrderBtn =
document.getElementById(
"placeOrderBtn"
);

placeOrderBtn.disabled = true;
placeOrderBtn.innerHTML =
"Submitting...";

const payload = {

name,
phone,
apartment,
flat,
notes,
order,
total

};

try{

await fetch(
CONFIG.scriptUrl,
{
method:"POST",
body:JSON.stringify(payload)
}
);

document.getElementById(
"successMessage"
).style.display = "block";

document.getElementById(
"successMessage"
).innerHTML =

`✅ Order Submitted Successfully

<br><br>

We'll deliver before 9 AM Sunday.`;

placeOrderBtn.innerHTML =
"✓ Order Submitted";

}
catch(error){

console.log(error);

placeOrderBtn.disabled =
false;

placeOrderBtn.innerHTML =
"Place Order";

alert(
"Something went wrong. Please try again."
);

}

}
