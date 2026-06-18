document.addEventListener("DOMContentLoaded", () => {

/* ================= DATA ================= */

let products = window.products || [];
let selectedProduct = null;

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

/* ================= ELEMENTS ================= */

const grid =
document.getElementById("productsGrid");

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

const menuBtn =
document.getElementById("menuBtn");

const sideMenu =
document.getElementById("sideMenu");

const cartOverlay =
document.getElementById("cartOverlay");

const closeMenuBtn =
document.getElementById("closeMenuBtn");

const cartCount =
document.getElementById("cartCount");

const cartList =
document.getElementById("cartList");

const cartTotal =
document.getElementById("cartTotal");

const checkoutBtn =
document.getElementById("checkoutBtn");

const header =
document.getElementById("header");

/* ================= MODAL ================= */

const modal =
document.getElementById("productModal");

const closeModal =
document.getElementById("closeModal");

const modalTitle =
document.getElementById("modalTitle");

const modalImage =
document.getElementById("modalImage");

const modalInfo =
document.getElementById("modalInfo");

const modalPrice =
document.getElementById("modalPrice");

const quantityInput =
document.getElementById("quantityInput");

const addToCartBtn =
document.getElementById("addToCartBtn");

/* ================= CUSTOMER ================= */

const customerModal =
document.getElementById("customerModal");

const closeCustomerModal =
document.getElementById("closeCustomerModal");

const customerName =
document.getElementById("customerName");

const customerPhone =
document.getElementById("customerPhone");

const customerAddress =
document.getElementById("customerAddress");

const sendOrderBtn =
document.getElementById("sendOrderBtn");

/* ================= SEARCH ================= */

searchBtn.addEventListener("click", () => {

document
.querySelector(".search-wrapper")
.classList.toggle("active");

searchInput.focus();

});

searchInput.addEventListener("input", () => {

const value =
searchInput.value.toLowerCase();

const filtered = products.filter(product => {

return (
product.title.toLowerCase().includes(value) ||
product.code.toLowerCase().includes(value) ||
product.info.toLowerCase().includes(value)
);

});

renderProducts(filtered);

});

/* ================= PRODUCTS ================= */

function renderProducts(list) {

grid.innerHTML = "";

if(list.length === 0){

grid.innerHTML = `
<div style="
text-align:center;
padding:60px;
width:100%;
">
محصولی یافت نشد
</div>
`;

return;
}

list.forEach(product => {

const card =
document.createElement("div");

card.className =
"product-card";

card.innerHTML = `

<div class="product-image">

<img
src="${product.image}"
alt="${product.title}"
onerror="this.src='images/no-image.jpg'"
>

</div>

<div class="product-body">

<div class="product-code">
${product.code}
</div>

<h3 class="title">
${product.title}
</h3>

<p class="info">
${product.info}
</p>

<div class="price">
${product.price.toLocaleString()}
تومان
</div>

<button class="open-btn">
مشاهده محصول
</button>

</div>

`;

card
.querySelector(".open-btn")
.addEventListener("click", () => {

selectedProduct = product;

modalTitle.textContent =
product.title;

modalImage.src =
product.image;

modalInfo.textContent =
product.info;

modalPrice.textContent =
product.price.toLocaleString() +
" تومان";

quantityInput.value = 1;

modal.style.display = "flex";

});

grid.appendChild(card);

});

}

/* ================= MODAL ================= */

closeModal.addEventListener("click", () => {

modal.style.display = "none";

});

window.addEventListener("click", e => {

if(e.target === modal){

modal.style.display = "none";

}

if(e.target === customerModal){

customerModal.style.display = "none";

}

});

/* ================= CART ================= */

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}

function renderCart(){

cartList.innerHTML = "";

let total = 0;
let count = 0;

cart.forEach((item,index) => {

const itemTotal =
item.price * item.quantity;

total += itemTotal;
count += item.quantity;

const li =
document.createElement("li");

li.innerHTML = `

<strong>
${item.title}
</strong>

<br>

تعداد:
${item.quantity}

<br>

${itemTotal.toLocaleString()}
تومان

<br><br>

<button
class="remove-btn"
data-index="${index}"
>
حذف
</button>

`;

cartList.appendChild(li);

});

document
.querySelectorAll(".remove-btn")
.forEach(btn => {

btn.addEventListener("click", () => {

const index =
btn.dataset.index;

cart.splice(index,1);

saveCart();

renderCart();

});

});

cartCount.textContent =
count;

cartTotal.textContent =
"جمع کل: " +
total.toLocaleString() +
" تومان";

}

/* ================= ADD TO CART ================= */

addToCartBtn.addEventListener("click", () => {

if(!selectedProduct) return;

const qty =
Number(quantityInput.value);

const existing =
cart.find(
item =>
item.code === selectedProduct.code
);

if(existing){

existing.quantity += qty;

}else{

cart.push({

...selectedProduct,

quantity:qty

});

}

saveCart();

renderCart();

modal.style.display = "none";

});

/* ================= DRAWER ================= */

function openCart(){

sideMenu.classList.add("active");

cartOverlay.classList.add("active");

}

function closeCart(){

sideMenu.classList.remove("active");

cartOverlay.classList.remove("active");

}

menuBtn.addEventListener(
"click",
openCart
);

closeMenuBtn.addEventListener(
"click",
closeCart
);

cartOverlay.addEventListener(
"click",
closeCart
);

/* ================= CATEGORY ================= */

document
.querySelectorAll(".category-card")
.forEach(card => {

card.addEventListener("click", () => {

const category = card.dataset.target;

if(category === "all"){

renderProducts(products);

}else{

const filtered = products.filter(
item => item.category === category
);

renderProducts(filtered);

}

document
.getElementById("productsSection")
.scrollIntoView({
behavior:"smooth"

});

});

});


/* ================= CHECKOUT ================= */

checkoutBtn.addEventListener("click", () => {

if(cart.length === 0){

alert("سبد خرید خالی است");

return;

}

customerModal.style.display =
"flex";

});

closeCustomerModal.addEventListener(
"click",
() => {

customerModal.style.display =
"none";

}
);

/* ================= WHATSAPP ================= */

sendOrderBtn.addEventListener("click", () => {

const name =
customerName.value.trim();

const phone =
customerPhone.value.trim();

const address =
customerAddress.value.trim();

if(
!name ||
!phone ||
!address
){

alert(
"لطفا اطلاعات را کامل وارد کنید"
);

return;

}

let message =
`🛒 سفارش جدید\n\n`;

message +=
`👤 نام: ${name}\n`;

message +=
`📞 تلفن: ${phone}\n`;

message +=
`📍 آدرس: ${address}\n\n`;

message +=
`📦 محصولات:\n\n`;

let total = 0;

cart.forEach(item => {

const itemTotal =
item.price * item.quantity;

total += itemTotal;

message +=
`▪ ${item.title}\n`;

message +=
`تعداد: ${item.quantity}\n`;

message +=
`قیمت: ${itemTotal.toLocaleString()} تومان\n\n`;

});

message +=
`💰 جمع کل: ${total.toLocaleString()} تومان`;

const ownerPhone =
"989131989254";

window.open(

`https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`,

"_blank"

);

cart = [];

saveCart();

renderCart();

customerModal.style.display =
"none";

});

/* ================= HEADER SCROLL ================= */

let lastScroll = 0;

window.addEventListener("scroll", () => {

const current =
window.pageYOffset;

if(current > lastScroll){

header.classList.add("hide");

}else{

header.classList.remove("hide");

}

lastScroll = current;

});

/* ================= INIT ================= */

renderProducts(products);

renderCart();

});