const container = document.getElementById("productDetails");
const toast = document.getElementById("toast");
let selectedSize = "M";
let qty = 1;
let basePrice = 0;

const id = new URLSearchParams(window.location.search).get("id");

async function loadProduct(){
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const p = await res.json();
    basePrice = p.price;

    container.innerHTML = `
    <div class="zoom-container">
        <img src="${p.image}" id="mainImg">
        <div class="lens" id="lens"></div>
    </div>

    <div class="preview" id="preview"></div>

    <div class="product-info">
        <h2>${p.title}</h2>
        <h3 id="totalPrice">₹ ${p.price}</h3>

        <p>${p.description}</p>

        <h4>Select Size</h4>
        <button class="variation-btn active" onclick="selectSize(this,'M')">M</button>
        <button class="variation-btn" onclick="selectSize(this,'L')">L</button>
        <button class="variation-btn" onclick="selectSize(this,'XL')">XL</button>

        <div class="qty-box">
            <button onclick="changeQty(-1)">−</button>
            <input id="qtyInput" value="1" readonly>
            <button onclick="changeQty(1)">+</button>
        </div>

        <button class="add-cart-btn" onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    </div>
    `;

    imageZoom();
}

function selectSize(btn,size){
    document.querySelectorAll(".variation-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    selectedSize=size;
}

function changeQty(val){
    qty+=val;
    if(qty<1) qty=1;
    if(qty>10) qty=10;
    document.getElementById("qtyInput").value=qty;
    document.getElementById("totalPrice").innerText="₹ "+(qty*basePrice).toFixed(2);
}

function addToCart(product){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push({...product,qty:qty,size:selectedSize});
    localStorage.setItem("cart",JSON.stringify(cart));

    toast.style.display="block";
    setTimeout(()=>toast.style.display="none",2000);
}

function imageZoom(){
    const img = document.getElementById("mainImg");
    const lens = document.getElementById("lens");
    const preview = document.getElementById("preview");

    preview.style.backgroundImage=`url(${img.src})`;

    img.addEventListener("mousemove",moveLens);
    img.addEventListener("mouseenter",()=>lens.style.display="block");
    img.addEventListener("mouseleave",()=>lens.style.display="none");

    function moveLens(e){
        const pos = img.getBoundingClientRect();
        let x = e.clientX - pos.left - lens.offsetWidth/2;
        let y = e.clientY - pos.top - lens.offsetHeight/2;

        x=Math.max(0,Math.min(x,img.width-lens.offsetWidth));
        y=Math.max(0,Math.min(y,img.height-lens.offsetHeight));

        lens.style.left=x+"px";
        lens.style.top=y+"px";

        preview.style.backgroundPosition=`-${x*2}px -${y*2}px`;
    }
}

loadProduct();
function addToCart(product){
    const item = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: selectedSize,
        qty: qty
    };

    addItemToCart(item);
}
