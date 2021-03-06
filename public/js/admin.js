const itemForm = document.querySelector('#item-form');
itemForm.addEventListener('submit', submitItem)


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

//controls what happens when an item is submitted
async function submitItem(event){
    event.preventDefault()
    
    console.log('submitting new item')
    const itemName = document.getElementById('item-name').value
    const itemPrice = document.getElementById('new-item-price').value
    const ingredients = document.getElementById('new-item-ingredients').value
    const category = document.getElementById('new-category')
    const categoryChoice = category.options[category.selectedIndex].value
    
    const result = await fetch('/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            itemName,
            categoryChoice,
            itemPrice,
            ingredients
        })
    }).then((res) => res.json())
    if (result.status === 'ok') {
        console.log('new item created')
    } else {
        alert('something went wrong')
    }
}

window.onload = verify()