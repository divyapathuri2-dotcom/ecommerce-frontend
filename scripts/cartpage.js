const cartItemsDiv = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

function loadCart(){
    const cart = getCart();
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
        cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
        checkoutBtn.disabled = true;
        totalPriceEl.innerText = "0";
        return;
    }

    checkoutBtn.disabled = false;

    cart.forEach((item,index)=>{
        total += item.price * item.qty;

        cartItemsDiv.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}">
            <div class="cart-info">
                <h4>${item.title}</h4>
                <p>Size: ${item.size}</p>
                <p>Price: ₹ ${item.price}</p>

                <div class="cart-qty">
                    <button onclick="updateQty(${index},-1)">−</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQty(${index},1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
        `;
    });

    totalPriceEl.innerText = total.toFixed(2);
    updateCartCount();
}

function updateQty(index,change){
    let cart = getCart();
    cart[index].qty += change;

    if(cart[index].qty < 1) cart[index].qty = 1;

    saveCart(cart);
    loadCart();
}

function removeItem(index){
    let cart = getCart();
    cart.splice(index,1);
    saveCart(cart);
    loadCart();
}

checkoutBtn.onclick = () => {
    alert("Proceeding to checkout...");
};

loadCart();
