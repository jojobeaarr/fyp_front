

export function getContainer(user_id){
    return fetch(`http://127.0.0.1:5000/api/card/container?username=${user_id}`)
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