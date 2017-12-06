import React from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import {Container} from "semantic-ui-react";
import {Route} from "react-router";
import {Provider} from "react-redux";

import "semantic-ui-css/semantic.min.css";

import Navigation from "./components/Navigation";
import MainScreen from "../screens/MainScreen";
import EditorScreen from "../screens/EditorScreen";

import store from "../../store";

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Container textAlign="center">
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={MainScreen}/>
                    <Route path="/editor" component={EditorScreen}/>
                </Switch>
            </Container>
        </BrowserRouter>
    </Provider>
);

export {App as default}
