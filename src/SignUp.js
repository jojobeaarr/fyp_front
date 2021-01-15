import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import "react-bootstrap";
import './Login.css';
import {Link} from "react-router-dom";
import {signUp, userExist} from "./middleman";
import PropTypes from 'prop-types';
import Login from "./Login";


export default function SignUp({setToken}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && name.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return(
        <div className="SignUp">
            <header className="text-center">
                <h5 className="display-4">Sign Up</h5>
            </header>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="name" className="lead">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        className="lead"
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email" className="lead">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className="lead"
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password" className="lead">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className="lead"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()} style={{background:'#B4B4F1', border:"none"}} onClick={() => {
                    userExist(email).then((response) => {
                        if (response == "False"){
                            signUp(name, email, password).then((response) => setToken(response))
                        }
                        else{
                            //Do something here
                            alert("Email already exists")
                        }
                    })
                }}>
                    Sign Up
                </Button>
                <Link to="/login" className="float-right lead" style={{color: '#B4B4F1'}}>Login</Link>
            </Form>
        </div>
    )
}

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired
}