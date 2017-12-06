import React, {Component} from 'react';
import {Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export default class Navigation extends Component {
    render() {
        return (
            <Menu pointing secondary>
                <Menu.Item as={NavLink} to="/" name="Uploader"/>
                <Menu.Item as={NavLink} to="/editor" name="Editor"/>
            </Menu>
        );
    }
}
