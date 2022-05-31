//get data
let loginButton = document.querySelectorAll('#login-forms-button');
let select = document.querySelector('select');
const adminForm = document.querySelector('#admin-form');
const adminLogin = document.querySelector('#admin-login');
const cashierForm = document.querySelector('#cashier-form');
const cashierLogin = document.querySelector('#cashier-login');
const baristaForm = document.querySelector('#barista-form');
const baristaLogin = document.querySelector('#barista-login');
const usernameInput = document.querySelectorAll(".form-name");
const passwordInput = document.querySelectorAll(".form-password");
const errorNodes = document.querySelectorAll(".error");
const loginOptions = document.querySelectorAll('option');
const optionsArray = Array.from(loginOptions);
cashierLogin.classList.add('show');

//select form
select.addEventListener('change', () => {
    adminLogin.classList.remove('show');
    baristaLogin.classList.remove('show');
    cashierLogin.classList.remove('show');
    switch (select.value) {
        case ('admin-login'):
           adminLogin.classList.add('show');
           break;
        case 'cashier-login':
            cashierLogin.classList.add('show');
            break;
        case 'barista-login':
            baristaLogin.classList.add('show');
    }    
});

//validate data
function validateForm(form){
    let errorFlag = false;
    if(form == 0){
        if(usernameInput[form].value.length < 1){
            errorNodes[0].innerText = "Username cannot be blank";
            usernameInput[0].classList.add("error-border");
            errorFlag = true;
        }
        if(passwordInput[form].value.length < 1){
            errorNodes[1].innerText = "Password cannot be blank";
            passwordInput[0].classList.add("error-border");
            errorFlag = true;
        }
    }
    else if(form == 1){
        if(usernameInput[form].value.length < 1){
            errorNodes[2].innerText = "Username cannot be blank";
            usernameInput[1].classList.add("error-border");
            errorFlag = true;
        }
        if(passwordInput[form].value.length < 1){
            errorNodes[3].innerText = "Password cannot be blank";
            passwordInput[1].classList.add("error-border");
            errorFlag = true;
        }
    }
    else if(form == 2){
        if(usernameInput[form].value.length < 1){
            errorNodes[4].innerText = "Username cannot be blank";
            usernameInput[2].classList.add("error-border");
            errorFlag = true;
        }
        if(passwordInput[form].value.length < 1){
            errorNodes[5].innerText = "Password cannot be blank";
            passwordInput[2].classList.add("error-border");
            errorFlag = true;
        }
    }
    if(!errorFlag && select.value == 'admin-login'){
        adminForm.submit();
    }
    if(!errorFlag && select.value == 'barista-login'){
        baristaForm.submit();
    }
    if(!errorFlag && select.value == 'cashier-login'){
        cashierForm.submit();
    }
}
