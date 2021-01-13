import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import "react-bootstrap";
import './Login.css';
import {Link} from "react-router-dom";
import {login} from "./middleman";
import PropTypes from 'prop-types';


export default function Login({setToken}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await login(email, password).then((response) => {
            // console.log(response)
            if (response != "Fail"){
                console.log("Login success")
                setToken(response)
            }
            else {
                alert("Invalid email/password")
            }
        })
    }

    return(
        <div className="Login">
            <header className="text-center">
                <h5>Login</h5>
            </header>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmit}>
                    Login
                </Button>
                <Link to="/signup" className="float-right">Sign Up</Link>
            </Form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}