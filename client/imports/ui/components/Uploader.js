import React, {Component} from "react";

import Dropzone from "react-dropzone";
import {Button, Header, Icon, Message, Segment} from "semantic-ui-react";
import {isEmpty} from "lodash";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Uploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            uploaded: false,
        };

        this.handleDrop = this.handleDrop.bind(this);
        this.upload = this.upload.bind(this);
    }

    upload() {
        this.setState({error: false});
        this.dropzoneRef.open();
    }

    handleDrop(accepted) {
        let error = false;

        if (isEmpty(accepted)) {
            error = true;
        } else {
            this.props.setImage(accepted[0]);
            this.setState({
                error,
                uploaded: true,
            });
        }

        this.setState({error});
    }

    render() {
        if (this.state.uploaded) {
            return <Redirect to="/editor"/>;
        }

        return (
            <span>
                {this.state.error &&
                <Message negative>
                    <Message.Header>Invalid file format</Message.Header>
                    <p>You tried to upload an unsupported file format</p>
                </Message>
                }
                <Segment textAlign="center" attached="bottom">
                    <Dropzone
                        onDragEnter={this.onDragEnter}
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
                {this.props.image}
            </span>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    setImage: image => {
        dispatch({
            type: 'SET_IMAGE',
            payload: image,
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
