const signInForm = document.getElementById("signinForm");
const signUpForm = document.getElementById("signupForm");
const goToSignup = document.getElementById("goToSignup");
const goToLogin = document.getElementById("goToLogin");

goToSignup.onclick = function(e) {
  e.preventDefault();
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
};

goToLogin.onclick = function(e) {
  e.preventDefault();
  signUpForm.style.display = "none";
  signInForm.style.display = "block";
};
