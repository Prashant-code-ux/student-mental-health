// const signInForm = document.getElementById("signinForm");
// const signUpForm = document.getElementById("signupForm");
// const goToSignup = document.getElementById("goToSignup");
// const goToLogin = document.getElementById("goToLogin");

// goToSignup.onclick = function(e) {
//   e.preventDefault();
//   signInForm.style.display = "none";
//   signUpForm.style.display = "block";
// };

// goToLogin.onclick = function(e) {
//   e.preventDefault();
//   signUpForm.style.display = "none";
//   signInForm.style.display = "block";
// };

// document.querySelector(".menu-toggle").addEventListener("click",()=>document.querySelector("nav").classList.toggle("show"));


const signInForm = document.getElementById("signinForm");
const signUpForm = document.getElementById("signupForm");
const goToSignup = document.getElementById("goToSignup");
const goToLogin = document.getElementById("goToLogin");

// Switch between forms
goToSignup.onclick = (e) => {
  e.preventDefault();
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
};

goToLogin.onclick = (e) => {
  e.preventDefault();
  signUpForm.style.display = "none";
  signInForm.style.display = "block";
};

// --- LOGIN ---
document.getElementById("signinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("All fields are required!");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      console.log("✅ Login successful:", data.user);
      window.location.href = "homePage.html";
    }
  } catch (err) {
    alert("❌ Error connecting to server");
    console.error(err);
  }

 
});

// --- SIGNUP ---
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!username || !email || !password) {
    alert("✅ Registered successfully!");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      console.log("✅ Registered successfully!");
      signUpForm.style.display = "none";
      signInForm.style.display = "block";
    }
  } catch (err) {
    alert("❌ Error connecting to server");
    console.error(err);
  }
});
