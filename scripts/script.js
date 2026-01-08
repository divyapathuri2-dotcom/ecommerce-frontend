<script src="script.js"></script>
const productGrid = document.getElementById("productGrid");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("error-message");

const API_URL = "https://fakestoreapi.com/products";

// Fetch products
async function fetchProducts() {
    loader.style.display = "block";
    errorMessage.innerText = "";

    try {
        // Check cache first
        const cachedData = localStorage.getItem("products");
        if (cachedData) {
            displayProducts(JSON.parse(cachedData));
            loader.style.display = "none";
            return;
        }

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("API Error");

        const data = await response.json();

        // Store in cache
        localStorage.setItem("products", JSON.stringify(data));

        displayProducts(data);
    } catch (error) {
        errorMessage.innerText = "Failed to load products. Please try again later.";
        console.error(error);
    } finally {
        loader.style.display = "none";
    }
}

// Create product cards dynamically
function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" loading="lazy">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">₹ ${product.price}</p>
            <p>${product.description.substring(0,60)}...</p>
        `;

        productGrid.appendChild(card);
    });
}

// Call function
fetchProducts();
card.innerHTML = `
    <a href="product.html?id=${product.id}">
        <img src="${product.image}" loading="lazy">
        <h3 class="product-title">${product.title}</h3>
    </a>
    <p class="product-price">₹ ${product.price}</p>
`;
