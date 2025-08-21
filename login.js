// const signUpBtnLink = document.querySelector('signUpBtn-link ');
// const signInBtnLink = document.querySelector('signUpBtn-link ');
// const wrapper = document.querySelector('.wrapper');

// signUpBtnLink.addEventListener('click', () => {
//     wrapper.classList.toggle('active')
// })

const signUpBtnLink = document.querySelector('.signUpBtn-link');
const signInBtnLink = document.querySelector('.signInBtn-link');
const wrapper = document.querySelector('.wrapper');

signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

// signInBtnLink.addEventListener('click', () => {
//     wrapper.classList.remove('active');
// });
