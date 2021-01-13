import {useState} from 'react';

export default function useToken() {

     function getToken(){
         // const userToken = JSON.parse(tokenString);
        return sessionStorage.getItem('token')
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', userToken);
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}