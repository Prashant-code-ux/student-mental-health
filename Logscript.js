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

    // ✅ New popup message function
function showPopup(message, type) {
  const popup = document.getElementById("popupMessage");
  const popupText = document.getElementById("popupText");
  const popupIcon = document.getElementById("popupIcon");

  popupText.textContent = message;
  popup.classList.remove("hidden", "success", "error");
  popup.classList.add(type);

  popupIcon.textContent = type === "success" ? "✅" : "❌";

  popup.style.opacity = "1";

  // Hide after 2 seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    popup.classList.add("hidden");
  }, 2000);
}


  
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

   if (res.ok) {
         
         showPopup("Login Successful! Redirecting...", "success");
        
      
         // Save login info to localStorage
         localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", data.username || email.split("@")[0]);


          setTimeout(() => (window.location.href = "homePage.html"), 1500);
        } else {
         
         showPopup(data.message || "Invalid Username or Password!", "error");

          
        }
      } catch (err) {
        showMessage("loginMessageBox", "❌ Server connection error!", "error");
      }
});

// --- SIGNUP ---
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!username || !email || !password) {
    showPopup("⚠️ All fields are required!", "error");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      showPopup("✅ Registered successfully! You can now log in.", "success");
      setTimeout(() => {
        signUpForm.style.display = "none";
        signInForm.style.display = "block";
      }, 1500);
    } else {
      showPopup(`❌ ${data.message}`, "error");
    }
  } catch (err) {
    showPopup("❌ Server connection error!", "error");
  }
});


document.getElementById("forgotPassword").addEventListener("click", (e) => {
  e.preventDefault();
  showPopup("🔑 Password reset link sent to your email!", "success");
});


