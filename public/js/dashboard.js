function dashboardStatus(result){
    document.querySelector('#role').innerHTML = result.data.role;

    
}
async function verify(){
    
    const token =window.sessionStorage.getItem('token')
    const result = await fetch('/dashboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    }).then((res) => res.json())
    if  (result.error && (result.error == 'TokenExpiredError')) {
        console.log(result.error.name)
        window.sessionStorage.clear()
        window.location.href = "login"
    }
    if (result.status && (result.status === 'ok')) {
        dashboardStatus(result)
        alert('You have logged in successfully')

    } else {
        window.location.href = "login"
        console.log('You are still not logged in')
    }  
}
verify()