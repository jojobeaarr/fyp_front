import './App.css';
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./Dashboard";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Login from "./Login";
import SignUp from "./SignUp";
import useToken from './useToken';

export default function App() {

    const {token, setToken} = useToken();

    return(
        <Router>
            <div>
                <Switch>
                    <Route path="/dashboard">
                        {token ? <Dashboard token={token}/> : <Redirect to="/login"/>}
                    </Route>
                    <Route path="/signup">
                        <SignUp setToken={setToken}/>
                    </Route>
                    <Route path="/login">
                        {token ? <Redirect to="/"/> : <Login setToken={setToken}/>}
                    </Route>
                    <Route path="/">
                        {token ? <Dashboard token={token}/> : <Redirect to="/login"/>}
                        {console.log("Token: "+ token)}
                    </Route>
                </Switch>
            </div>
        </Router>
    )

}

