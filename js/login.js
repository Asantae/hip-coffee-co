//get data

let loginButton = document.querySelectorAll('#login-forms-button');
const adminForm = document.querySelector('#admin-form');
const cashierForm = document.querySelector('#cashier-form');
const baristaForm = document.querySelector('#barista-form');
const usernameInput = document.querySelector("#form-name");
const passwordInput = document.querySelector("#form-password");
const errorNodes = document.querySelectorAll(".error");
const loginOptions = document.querySelectorAll('option');
const optionsArray = Array.from(loginOptions);
for(var i = 0; i < optionsArray.length; i++){
    optionsArray[i].addEventListener("change", console.log(`clicked ${optionsArray[i].innerText}`))
}

//validate data

function validateForm(){
    let errorFlag = false;
    if(usernameInput.value.length < 1){
        errorNodes[0].innerText = "Username cannot be blank";
        usernameInput.classList.add("error-border");
        errorFlag = true;
    }
    if(passwordInput.value.length < 1){
        errorNodes[1].innerText = "Password cannot be blank";
        passwordInput.classList.add("error-border");
        errorFlag = true;
    }
    if(!errorFlag){
        adminForm.submit();
    }
}
