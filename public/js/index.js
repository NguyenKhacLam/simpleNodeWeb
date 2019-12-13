import '@babel/polyfill'
import { login } from './login'
import { signUp } from './user'
import { logOut } from './user';
import { addProduct } from './product';


const loginForm = document.getElementById("logInForm");
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        login(email, password)
    })
}

const signUpForm = document.getElementById("signUpForm");
if (signUpForm) {
    signUpForm.addEventListener('submit', e => {
        e.preventDefault();
        const firstname = document.getElementById('signupFirstName').value;
        const lastname = document.getElementById('signupLastName').value;
        const username = document.getElementById('signupUserName').value;
        const phone = document.getElementById('signupPhone').value;
        const email = document.getElementById('signupEmail').value;
        const address = document.getElementById('signupAddress').value;
        const password = document.getElementById('signupPassword').value;
        const repassword = document.getElementById('signupRePassword').value;

        signUp(firstname, lastname, username, phone, email, address, password, repassword)
    })
}

const logOutBtn = document.querySelector('.nav_logout');

if (logOutBtn) {
    logOutBtn.addEventListener('click', logOut)
}

const addProductForm = document.querySelector("#addProductForm");
if (addProductForm) {
    addProductForm.addEventListener('submit=', e => {
        e.preventDefault;
        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const amount = document.getElementById('productAmount').value;
        const price = document.getElementById('productPrice').value;
        const sales = document.getElementById('productSales').value;
        const imageCover = document.getElementById('productImgCover').value;
        const images = document.getElementById('productImg').value;
        const description = document.getElementById('productDescription').value;
        const optionName = document.getElementById('productOption').value;
        const optionVals = document.getElementById('productOptionVal').value;
        addProduct(name, price, description, imageCover, images, category, amount, sales, optionName, optionVals);
    })
}