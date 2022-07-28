function dashboardStatus(result){
    document.querySelector('#employee-name').innerHTML = result.data.username;

    
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
    console.log(result.data.username)
    if (result.status === 'ok') {
        dashboardStatus(result)
        alert('You have logged in successfully')

    } else {
        console.log('You are still not logged in')
    }  
}
verify()