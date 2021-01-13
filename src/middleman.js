export function signUp(name, email, password){
    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("email", email)
    formdata.append("password", password)
    return fetch(`http://127.0.0.1:5000/api/user/create`, {
        method: "POST",
        body:formdata
    }).then((response) => response.json())
}

export function userExist(email){
    return fetch(`http://127.0.0.1:5000/api/user/exist?email=${email}`)
        .then(function(response){
            return response.json()
        })
}

export function login(email, password){
    const formdata = new FormData()
    formdata.append("email", email)
    formdata.append("password", password)
    return fetch(`http://127.0.0.1:5000/api/user/login`, {
        method: "POST",
        body:formdata
    }).then((response) => {
        return response.json()
    })
}

export function getContainer(auth_token){
    return fetch(`http://127.0.0.1:5000/api/card/container`, {
        method: 'post',
        headers: new Headers({
            "Authorization": auth_token
        })
    })
        .then(function(response){
            return response.json()
        })

}

export function getCards(container_id, card_id){
    card_id = card_id==null?"":card_id
     return fetch(`http://127.0.0.1:5000/api/card/get?container_id=${container_id}&card_id=${card_id}`)
        .then(function(response){
            return response.json()
        })
}

export function updateCards(card_id, card_content){
        const data = {
            "card_id": card_id,
            "card_content": card_content
        }
        return fetch(`http://127.0.0.1:5000/api/card/update`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
}