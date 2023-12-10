
const storeLoginToken = async (token) => {
  // send to api/logout in backend next js 
    await fetch('/api/login' , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ token })
    })
}


const removeLoginToken = async () => {
    // send to api/logout in backend next js 
    await fetch('/api/logout' , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
}

export { storeLoginToken , removeLoginToken };