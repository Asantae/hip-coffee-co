//get data
const registrationForm = document.querySelector('#registration-form');
const usernameInput = document.querySelector(".login-name");
const passwordInput = document.querySelector(".login-password");
const reEnteredPassInput = document.querySelector("#reEnteredPass")
const errorNodes = document.querySelectorAll(".error");
registrationForm.addEventListener('submit', registerUser)

//validate data
function validateForm(){
    clearMessages()
    let errorFlag = false;
    if(usernameInput.value.length < 1){
        errorNodes[0].innerText = "Username cannot be blank";
        usernameInput.classList.add("error-border");
        errorFlag = true;
    }
    if(usernameInput.value.length >= 1 && usernameInput.value.length < 6){
        errorNodes[0].innerText = "Username must be at least 6 characters";
        usernameInput.classList.add("error-border");
        errorFlag = true;
    }
    if((!usernameInput.value || typeof usernameInput.value !== 'string') && usernameInput.value >= 1){
        errorNodes[0].innerText = "Invalid username";
        usernameInput.classList.add("error-border");
        errorFlag = true;
    }
    if(passwordInput.value.length < 1){
        errorNodes[1].innerText = "Password cannot be blank";
        passwordInput.classList.add("error-border");
        errorFlag = true;
    }
    if(passwordInput.value.length >=1 && passwordInput.value.length < 8){
        errorNodes[1].innerText = "Password must be at least 8 characters";
        passwordInput.classList.add("error-border");
        errorFlag = true;
    }
    if(reEnteredPassInput.value < 1){
        errorNodes[2].innerText = "Please re-enter your password";
        reEnteredPassInput.classList.add('error-border');
    } 
    if(passwordInput.value !== reEnteredPassInput.value){
        errorNodes[2].innerText = "Passwords do not match";
        reEnteredPassInput.classList.add('error-border');
    }
}

function clearMessages(){
    for(let i = 0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    usernameInput.classList.remove("error-border");
    passwordInput.classList.remove("error-border");
    reEnteredPassInput.classList.remove("error-border")
}

//saves username and password data to database
async function registerUser(event){
    event.preventDefault()
    validateForm()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const reEnteredPass = document.getElementById('reEnteredPass').value

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            reEnteredPass
        })
    }).then((res) => res.json())
    if (result.status === 'ok') {
        window.location.href = 'login.html'
    } else if(errorNodes[0].innerText == '' && errorNodes[2].innerText == ''){
        errorNodes[0].innerText = "Username already exists";
        usernameInput.classList.add("error-border");
        passwordInput.classList.add("error-border");
    }
}