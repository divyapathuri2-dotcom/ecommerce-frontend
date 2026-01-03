console.log("E-Commerce Website Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar ul");
    const productGrid = document.getElementById("productGrid");

    // Toggle mobile menu
    hamburger.addEventListener("click", () => {
        if (navMenu.style.display === "flex") {
            navMenu.style.display = "none";
        } else {
            navMenu.style.display = "flex";
            navMenu.style.flexDirection = "column";
            navMenu.style.backgroundColor = "#fff";
            navMenu.style.position = "absolute";
            navMenu.style.top = "60px";
            navMenu.style.right = "20px";
            navMenu.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
            navMenu.style.padding = "10px";
            navMenu.style.borderRadius = "6px";
        }
    });

    // Fetch Products ON PAGE LOAD
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => displayProducts(data))
        .catch(err => console.log(err));

    function displayProducts(products) {
        productGrid.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.image}" loading="lazy" alt="${product.title}">
                <h3>${product.title.slice(0,40)}...</h3>
                <p>₹ ${(product.price * 80).toFixed(0)}</p>
                <button onclick="addToCart()">Add to Cart</button>
            `;

            productGrid.appendChild(card);
        });
    }

});

// Global function
function addToCart() {
    alert("Product added to cart!");
}
