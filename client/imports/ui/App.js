import React from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import {Container} from "semantic-ui-react";
import {Route} from "react-router";

import "semantic-ui-css/semantic.min.css";

import Navigation from "./components/Navigation";
import MainScreen from "../screens/MainScreen";

const App = () => (
    <BrowserRouter>
        <Container textAlign="center">
            <Navigation/>
            <Switch>
                <Route exact path="/" component={MainScreen}/>
            </Switch>
        </Container>
    </BrowserRouter>
);

export {App as default}
