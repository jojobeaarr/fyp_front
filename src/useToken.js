import {useState} from 'react';
import jwt_decode from "jwt-decode";

export default function useToken() {

    function checkToken() {
        let userToken = sessionStorage.getItem('token');
        if (userToken != null){
            let decoded_token = jwt_decode(userToken)
            let currentDate = new Date();
            // JWT exp is in seconds
            if (decoded_token.exp * 1000 < currentDate.getTime()) {
                console.log("Token expired.")
                sessionStorage.removeItem('token')
            }
        }

    }

     function getToken(){
         // const userToken = JSON.parse(tokenString);
         sessionStorage.getItem('token')
         checkToken()

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