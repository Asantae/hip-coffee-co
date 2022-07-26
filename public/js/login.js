//get data

const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector(".login-name");
const passwordInput = document.querySelector(".login-password");
const errorNodes = document.querySelectorAll(".error");
loginForm.addEventListener('submit', login)

//validate data
function validateForm(){
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
}

function clearMessages(){
    for(let i = 0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    usernameInput.classList.remove("error-border");
    passwordInput.classList.remove("error-border");
}


async function loginFunc(event){
    event.preventDefault()
    validateForm()
    console.log('starting login')
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())
    
    console.log(result)
    if (result.status === 'ok' && result.login === true) {
        sessionStorage.setItem('token', result.token)
        //window.location.href = 'dashboard.html'
    } else {
        alert(result)
    }
}

async function verify(result){
    token = result.token;
    login = result.login;
    status = result.status;
    await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
        })
    }).then((res) => res.json())
}