import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import "react-bootstrap";
import './Login.css';
import {Link} from "react-router-dom";
import {signUp, userExist} from "./middleman";

export default function SignUp(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return(
        <div className="SignUp">
            <header className="text-center">
                <h5>Sign Up</h5>
            </header>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
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
                <Button block size="lg" type="submit" disabled={!validateForm()} onClick={() => {
                    userExist(email).then((response) => {
                        if (response == "False"){
                            signUp(name, email, password).then((response) => console.log(response))
                        }
                        else{
                            //Do something here
                            alert("Email already exists")
                        }
                    })

                }}>
                    Sign Up
                </Button>
                <Link to="/login" className="float-right">Login</Link>
            </Form>
        </div>
    )
}