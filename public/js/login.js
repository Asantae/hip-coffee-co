//get data
const usernameInput = document.querySelectorAll(".login-name");
const passwordInput = document.querySelectorAll(".login-password");
const errorNodes = document.querySelectorAll(".error");

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
