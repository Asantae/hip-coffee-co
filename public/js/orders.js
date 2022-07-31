function setCookie(x){
    const d = new Date()
    d.setTime(d.getTime() + (12*60*60*1000))
    let expires = 'expires='+d.toUTCString
    document.cookie = 'jsonCookie=' + x + ';' + expires + ';path=/'
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