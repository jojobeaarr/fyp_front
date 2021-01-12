import './App.css';
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./Dashboard";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Login from "./Login";
import SignUp from "./SignUp";

export default function App() {
    const [token, setToken] = useState();

    // if(!token) {
    //     return <Login setToken={setToken} />
    // }

    return(
        <Router>
            <div>
                <Switch>
                    <Route path="/dashboard">
                        {token ? <Dashboard/> : <Redirect to="/login"/>}
                    </Route>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/"></Route>
                </Switch>
            </div>
        </Router>
    )

}

