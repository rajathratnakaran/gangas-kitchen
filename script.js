const CONFIG = {

whatsappNumber: "8589812323",
scriptUrl:
"https://script.google.com/macros/s/AKfycbyrOiVZ69q9a2irSWszN3m03Qn_MCybexK6AkvqF6gntAWEnpsl2XsphttDTWt5P-CHIQ/exec",
sundayComboPrice: 169,
familyComboPrice: 329,
items: {
    Poori: {
        price: 10,
        image: "images/poori.jpg"
    },
    Channa: {
        price: 69,
        image: "images/channa.jpg"
    },
    Idli: {
        price: 10,
        image: "images/idli.jpg"
    },
    Sambar: {
        price: 39,
        image: "images/sambar.jpg"
    }
}

};

const cart = {};

const menuContainer =
document.getElementById(“menuContainer”);

buildMenu();

function buildMenu(){

let html = "";
Object.keys(CONFIG.items).forEach(item => {
    html += `
    <div class="menu-item">
        <div class="item-left">
            <img src="${CONFIG.items[item].image}">
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
            <button onclick="changeQty('${item}',-1)">
                -
            </button>
            <span id="${item}Qty">
                0
            </span>
            <button onclick="changeQty('${item}',1)">
                +
            </button>
        </div>
    </div>
    `;
});
menuContainer.innerHTML = html;

}

function addCombo(name){

cart[name] = (cart[name] || 0) + 1;
updateCart();

}

function changeQty(item,change){

cart[item] = (cart[item] || 0) + change;
if(cart[item] < 0){
    cart[item] = 0;
}
document.getElementById(
    item + "Qty"
).innerText = cart[item];
updateCart();

}

function updateCart(){

let total = 0;
let html = "";
Object.keys(cart).forEach(item => {
    if(cart[item] <= 0){
        return;
    }
    html += `
        ${item} x ${cart[item]}<br>
    `;
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
document.getElementById(
    "cart"
).innerHTML = html;
document.getElementById(
    "total"
).innerText = "₹" + total;
document.getElementById(
    "floatingCart"
).innerText = "🛒 ₹" + total;

}

async function placeOrder(){

const name =
document.getElementById("name").value.trim();
const phone =
document.getElementById("phone").value.trim();
const apartment =
document.getElementById("apartment").value.trim();
const flat =
document.getElementById("flat").value.trim();
const notes =
document.getElementById("notes").value.trim();
const order =
document.getElementById("cart").innerText;
const total =
document.getElementById("total").innerText;
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
}
catch(error){
    console.log(error);
}
const whatsappMessage = encodeURIComponent(

`Hi Ganga’s Kitchen,

Name: ${name}
Phone: ${phone}

Apartment: ${apartment}
Flat: ${flat}

Order:
${order}

Total: ${total}

Notes:
${notes}`

);
window.open(

https://wa.me/91${CONFIG.whatsappNumber}?text=${whatsappMessage},

“_blank”

);

}