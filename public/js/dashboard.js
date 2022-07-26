async function verify(){
    console.log('verifying user info')
    const result = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username
        })
    })
    console.log(result)
    if (result.status === 'ok') {
        alert('You have logged in successfully')
    } else {
        console.log('You are still not logged in')
    }  
}
verify()