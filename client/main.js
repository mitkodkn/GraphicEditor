import React from 'react';
import {render} from 'react-dom';

import App from "./imports/ui/App";

Meteor.startup(() => {
    render(<App/>, document.getElementById('mount'));
});