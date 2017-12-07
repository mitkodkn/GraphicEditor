import React, {Component} from 'react';
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class Navigation extends Component {
    render() {
        return (
            <Menu pointing secondary>
                <Menu.Item as={Link} to="/" name="Uploader"/>
                <Menu.Item as={Link} to="/editor" name="Editor"/>
            </Menu>
        );
    }
}
