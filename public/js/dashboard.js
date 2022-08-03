const clockIn = document.querySelector("#clock-in")
const logOut = document.querySelector("#log-out")
const viewMenu = document.querySelector("#view-menu")
const editMenu = document.querySelector("#edit-items")
viewMenu.addEventListener('click', () => {
    window.location.href = 'view-menu'
})
logOut.addEventListener('click', () => {
    deleteCookie()
    window.location.href = 'login'
})

clockIn.addEventListener('click', () => {
    window.location.href = 'orders'
})

editMenu.addEventListener('click', () => {
    window.location.href = 'admin'
})

function dashboardStatus(result){
    if(result.data.isAdmin){
        document.querySelector('#role').innerHTML = 'Admin'
    } else {
        document.querySelector('#role').innerHTML = result.data.role;    
    }
    
    document.querySelector('#employee-name').innerHTML = result.data.username;
}

function getCookie(){
    let x = document.cookie.split('=')[1].split(' ')[0].split(',').map(x => x.replaceAll('"', '').replaceAll('{','').replaceAll('}','').replaceAll(';','')).map(x => x.split(':'))
    x = Object.fromEntries(x)
    return x
}

function deleteCookie(){
    let y = document.cookie + ';'
    document.cookie = y + 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'                                                                                                                            
}

async function verify(){
    x = getCookie()
    const token = x.token
    const result = await fetch('/dashboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    }).then((res) => res.json())
    if(result.error && (result.error == 'TokenExpiredError')){
        window.location.href = "login"
    }
    if(result.status && (result.status === 'ok') && document.cookie !== ''){
        dashboardStatus(result)
    } else {
        window.location.href = "login"
    }  
    console.log(result)
}
window.onload = verify()