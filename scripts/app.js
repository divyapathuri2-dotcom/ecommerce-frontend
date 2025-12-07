console.log("E-Commerce Website Loaded");
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    // Toggle nav menu visibility on mobile
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
});
