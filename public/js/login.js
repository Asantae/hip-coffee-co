//get data
const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector(".login-name");
const passwordInput = document.querySelector(".login-password");
const errorNodes = document.querySelectorAll(".error");

//validate data
function validateForm(form){
    clearMessages()
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
        loginForm.submit();
    }
}

function clearMessages(){
    for(let i = 0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    usernameInput.classList.remove("error-border");
    passwordInput.classList.remove("error-border");
}
