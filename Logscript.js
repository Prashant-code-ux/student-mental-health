const title = document.getElementById('title');
const NameField = document.getElementById('NameField');
const Signbtn = document.getElementById('signbtn');
const signupbtn = document.getElementById('signupbtn');

signupbtn.onclick = function() {
    title.innerHTML = "Sign Up";
    NameField.style.display = "block";
}

Signbtn.onclick = function() {
    title.innerHTML = "Login";
    NameField.style.display = "none";
}