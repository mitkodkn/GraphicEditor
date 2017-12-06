import React from "react";
import Navigation from "./components/Navigation";
import Uploader from "./components/Uploader";
import {Container} from "semantic-ui-react";

import 'semantic-ui-css/semantic.min.css';

const App = () => (
    <Container textAlign="center">
        <Navigation/>
        <Uploader/>
    </Container>
);

export {App as default}
