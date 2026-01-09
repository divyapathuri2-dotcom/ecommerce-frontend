function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount(){
    const cart = getCart();
    let total = 0;
    cart.forEach(item => total += item.qty);

    document.querySelectorAll("#cartCount").forEach(el=>{
        el.innerText = total;
    });
}

function addItemToCart(item){
    let cart = getCart();

    const existingItem = cart.find(p =>
        p.id === item.id && p.size === item.size
    );

    if(existingItem){
        existingItem.qty += item.qty;
    } else {
        cart.push(item);
    }

    saveCart(cart);
    updateCartCount();
    showToast("Item added to cart!");
}

function showToast(msg){
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.style.display = "block";
    setTimeout(()=>toast.style.display="none",2000);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
