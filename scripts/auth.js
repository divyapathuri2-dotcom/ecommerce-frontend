const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

function showSignup(){
    loginForm.style.display="none";
    signupForm.style.display="block";
    document.getElementById("formTitle").innerText="Sign Up";
}

function showLogin(){
    signupForm.style.display="none";
    loginForm.style.display="block";
    document.getElementById("formTitle").innerText="Login";
}

// Signup
signupForm.addEventListener("submit",function(e){
    e.preventDefault();

    const name = fullName.value;
    const email = signupEmail.value;
    const pass = signupPassword.value;
    const confirm = confirmPassword.value;

    if(!validateEmail(email)){
        signupError.innerText="Invalid email format";
        return;
    }

    if(pass.length < 8 || !/[A-Z]/.test(pass) || !/[0-9]/.test(pass)){
        signupError.innerText="Password must contain 8 chars, 1 uppercase & 1 number";
        return;
    }

    if(pass !== confirm){
        signupError.innerText="Passwords do not match";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({name,email,pass});
    localStorage.setItem("users",JSON.stringify(users));

    alert("Signup successful!");
    showLogin();
});

// Login
loginForm.addEventListener("submit",function(e){
    e.preventDefault();

    const email = loginEmail.value;
    const pass = loginPassword.value;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u=>u.email===email && u.pass===pass);

    if(user){
        localStorage.setItem("loggedUser",JSON.stringify(user));
        window.location.href="index.html";
    } else {
        loginError.innerText="Invalid email or password";
    }
});

function validateEmail(email){
    return /^\S+@\S+\.\S+$/.test(email);
}
