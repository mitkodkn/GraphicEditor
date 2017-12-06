import React, {Component} from "react";

import Dropzone from "react-dropzone";
import {Button, Header, Icon, Segment} from "semantic-ui-react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);

        this.handleDrop = this.handleDrop.bind(this);
        this.upload = this.upload.bind(this);
    }

    upload() {
        this.dropzoneRef.open();
    }

    handleDrop(accepted, rejected) {
        console.log(accepted);
        console.log(rejected);
    }

    render() {
        return (
            <span>
                <Segment textAlign="center">
                    <Dropzone
                        accept="image/jpeg, image/png"
                        ref={(node) => {
                            this.dropzoneRef = node;
                        }}
                        style={{position: "relative"}}
                        onDrop={this.handleDrop}>
                        <br/>
                        <Icon name="file image outline" size="massive"/>
                        <Header>Drag your image here</Header>
                    </Dropzone>
                </Segment>
                <Button basic content="Upload your image" icon="upload" labelPosition="left" onClick={this.upload}/>
            </span>
        );
    }
}

